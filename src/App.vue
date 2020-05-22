<template>
  <div
    id="app"
    class="flex"
  >
    <div class="content flex align-items-top justify-content-stretch scroll">
      <div class="left-panel wrap">
        <div class="short-url grow full-width">
          <border-box>
            <div class="flex justify-content-stretch">
              <button @click="getShortLink">
                Get Shortlink
              </button>
              <input
                v-model="shortUrl"
                type="text"
                placeholder="No url saved..."
                readonly
                class="grow"
              >
            </div>
          </border-box>
        </div>
        <div class="grow">
          <planet-view
            v-model="planet"
          />
          <building-queue
            v-model="buildOrder"
            :available="availableBuildings"
            :log="buildLog"
            class="margin-top margin-bottom"
          />
        </div>
        <div class="margin-left grow">
          <research-queue
            :order="researchOrder"
            @orderUpdated="updateResearchOrder"
          />
          <ship-queue
            v-model="shipOrder"
            :available="availableShips"
            :log="shipLog"
            class="margin-top margin-bottom"
          />
        </div>
      </div>

      <div class="right-panel grow margin-left">
        <calc
          :key="orderHash"
          :build-order="buildOrder"
          :research-order="researchOrder"
          :ship-order="shipOrder"
          @logUpdated="updateLog"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BorderBox from './components/BorderBox'
import Buildings from './data/buildings.js'
import Calc from './views/Calc'
import BuildingQueue from './views/BuildingQueue'
import Planet from './views/Planet'
import ResearchQueue from './views/ResearchQueue'
import ShipQueue from './views/ShipQueue'
import Ships from './data/ships.js'
import md5 from 'md5'
import TinyURL from './helper/tiny-url.js'
import PlanetClass from './models/planet.js'

export default {
  components: {
    buildingQueue: BuildingQueue,
    planetView: Planet,
    researchQueue: ResearchQueue,
    shipQueue: ShipQueue,
    calc: Calc,
    BorderBox
  },
  data () {
    return {
      buildings: Buildings,
      ships: Ships,
      planet: new PlanetClass(),
      buildOrder: [],
      researchOrder: [],
      shipOrder: [],
      log: [],
      shortUrl: null
    }
  },
  computed: {
    orderHash () {
      return md5(JSON.stringify(this.buildOrder) + JSON.stringify(this.researchOrder) + JSON.stringify(this.shipOrder))
    },
    availableBuildings () {
      let buildings = {}

      for (let buildingRef in this.buildings) {
        if (this.buildings[buildingRef].canBuild && this.buildingRequirementsMet(buildingRef) && !(this.buildings[buildingRef].unique && this.alreadyBuilt(buildingRef))) {
          buildings[buildingRef] = this.buildings[buildingRef]
        }
      }

      return buildings
    },
    availableShips () {
      let ships = {}

      for (let shipRef in this.ships) {
        if (this.ships[shipRef].requires.buildings.every(
          requiredBuildingRef => this.buildOrder.some(
            ({ ref }) => requiredBuildingRef === ref
          )
        )) {
          ships[shipRef] = this.ships[shipRef]
        }
      }

      return ships
    },

    /*
     * Some buildings, e.g. for energy, are automatically handled when energy is required,
     * but we still want them to be visible in the buildOrder.
     * Therefore we extract all required information from the calculated log.
     */
    buildLog () {
      let buildLog = []
      this.log.forEach(({ queue, turn }) => {
        if (queue.building.ref && queue.building.turns === this.buildings[queue.building.ref].turns) {
          buildLog.push({
            turn: turn,
            ref: queue.building.ref
          })
        }
      })
      return buildLog
    },

    shipLog () {
      let shipLog = []
      let waiting = false
      this.log.forEach(({ queue, turn }) => {
        if ((queue.production.ref === 'wait' && !waiting) || (queue.production.ref && queue.production.turns === this.ships[queue.production.ref].turns)) {
          shipLog.push({
            turn: turn,
            ref: queue.production.ref,
            quantity: queue.production.quantity
          })
          waiting = queue.production.ref === 'wait'
        }
      })
      return shipLog
    }
  },
  watch: {
    buildOrder () {
      this.updateUrlHash()
    },
    researchOrder () {
      this.updateUrlHash()
    },
    shipOrder () {
      this.updateUrlHash()
    }
  },
  mounted () {
    if (window.location.hash) {
      let loadedData = JSON.parse(atob(window.location.hash.replace('#', '')))

      this.$set(this, 'buildOrder', this.migrateBuildingData(loadedData[0]))
      this.$set(this, 'researchOrder', loadedData[1])
      if (loadedData[2] !== undefined) {
        this.$set(this, 'shipOrder', this.migrateShipData(loadedData[2]))
      }

      // Look up current short URL
      TinyURL.resolve(window.location.href)
        .then(shortUrl => {
          this.$set(this, 'shortUrl', shortUrl)
        })
        .catch(() => {
          // No need to do anything with the error
        })
    }
  },
  methods: {
    /**
     * We received an orderUpdated event for research, propagate to children
     * @param {Array} newOrder
     */
    updateResearchOrder (newOrder) {
      this.$set(this, 'researchOrder', newOrder)
    },

    /**
     * @param {Array} log
     */
    updateLog (log) {
      this.$set(this, 'log', log)
    },

    /**
     * Update stored URL hash of build order
     */
    updateUrlHash () {
      window.location.hash = btoa(JSON.stringify([this.buildOrder, this.researchOrder, this.shipOrder]))
      this.$set(this, 'shortUrl', '')
    },

    /**
     * Get a short link for the current config
     */
    getShortLink () {
      TinyURL.shorten(window.location.href)
        .then(shortUrl => {
          this.$set(this, 'shortUrl', shortUrl)
        })
        .catch(() => {
          // No need to do anything with the error
        })
    },

    /**
     * Check if requirements are met for a building
     * @param {String} buildingRef
     */
    buildingRequirementsMet (buildingRef) {
      return this.buildings[buildingRef].requires.buildings.every(
        requiredBuildingRef => this.alreadyBuilt(requiredBuildingRef)
      )
    },

    /**
     * Check if a building is already built
     * @param {String} buildingRef
     */
    alreadyBuilt (buildingRef) {
      return this.buildLog.some(
        ({ ref }) => buildingRef === ref
      )
    },

    /**
     * Different versions of hashes exist, which results in the annoying fact that when people load a bookmarked buildlist, they lose their data.
     * To avoid frustration, we execute a migration step.
     *
     * v1: Only use string containing building ref.
     * Example:
     * [ 'mineral_extractor' ]
     *
     * v2: Change string to object with keys 'turn' and 'key'.
     * Example:
     * [
     *   {
     *     turn: '1',
     *     key: 'mineral_extractor'
     *   }
     * ]
     *
     * v3: change object key 'key' to 'ref', as is used in most places in the code.
     * Example:
     * [
     *   {
     *     turn: '1',
     *     ref: 'mineral_extractor'
     *   }
     * ]
     *
     * @param {Object} data
     */
    migrateBuildingData (data) {
      if (data.length === 0) {
        return data
      }

      // Migrate from v1 to v2
      data = data.map(item => {
        if (typeof item === 'string') {
          item = {
            turn: null,
            key: item
          }
        }
        return item
      })

      // Migrate from v2 to v3
      data = data.map(item => {
        if (item.key) {
          item = {
            turn: null,
            ref: item.key
          }
        }
        return item
      })

      return data
    },

    /**
     * Different versions of hashes exist, which results in the annoying fact that when people load a bookmarked buildlist, they lose their data.
     * To avoid frustration, we execute a migration step.
     *
     * v1: Use object with keys 'turn' and 'ref'.
     * Example:
     * [
     *   {
     *     turn: '100',
     *     ref: 'outpost_ship'
     *   }
     * ]
     *
     * v2: add quantity
     * Example:
     * [
     *   {
     *     turn: '100',
     *     ref: 'outpost_ship',
     *     quantity: 1
     *   }
     * ]
     *
     * @param {Object} data
     */
    migrateShipData (data) {
      if (data.length === 0) {
        return data
      }

      // Migrate from v1 to v2
      data = data.map(item => {
        if (!item.quantity) {
          item = {
            turn: item.turn,
            ref: item.ref,
            quantity: 1
          }
        }
        return item
      })

      return data
    }
  }
}
</script>

<style lang="scss">
@import 'scss/app.scss';
</style>
