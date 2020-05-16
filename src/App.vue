<template>
  <div id="app" class="flex">
    <div class="content flex justify-content-stretch scroll">
      <building-queue :order="buildOrder" @orderUpdated="updateBuildOrder" />
      <div class="margin-left">
        <research-queue :order="researchOrder" @orderUpdated="updateResearchOrder" />
        <ship-queue :order="shipOrder" :available="availableShips" @orderUpdated="updateShipOrder" class="margin-top" />
      </div>
      <calc :build-order="buildOrder" :research-order="researchOrder" :ship-order="shipOrder" class="grow margin-left" :key="orderHash" />
    </div>
  </div>
</template>

<script>
import Calc from './views/Calc'
import BuildingQueue from './views/BuildingQueue'
import ResearchQueue from './views/ResearchQueue'
import ShipQueue from './views/ShipQueue'
import Ships from '@/ships.js'
import md5 from 'md5'

export default {
  components: {
    buildingQueue: BuildingQueue,
    researchQueue: ResearchQueue,
    shipQueue: ShipQueue,
    calc: Calc
  },
  computed: {
    orderHash () {
      return md5(JSON.stringify(this.buildOrder) + JSON.stringify(this.researchOrder))
    },
    availableShips () {
      let ships = {}

      for (let shipRef in this.ships) {
        if (this.ships[shipRef].requires.every(
          requiredBuildingRef => this.buildOrder.some(
            ({ ref }) => requiredBuildingRef === ref
          )
        )) {
          ships[shipRef] = this.ships[shipRef]
        }
      }

      return ships
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
  data () {
    return {
      buildOrder: [],
      researchOrder: [],
      shipOrder: [],
      ships: Ships
    }
  },
  mounted () {
    if (window.location.hash) {
      let loadedData = JSON.parse(atob(window.location.hash.replace('#', '')))
      this.$set(this, 'buildOrder', this.migrateBuildingData(loadedData[0]))
      this.$set(this, 'researchOrder', loadedData[1])
      this.$set(this, 'shipOrder', loadedData[2] === undefined ? [] : loadedData[2])
    }
  },
  methods: {
    /**
     * We received an orderUpdated event for buildings, propagate to children
     * @param {Array} newOrder
     */
    updateBuildOrder (newOrder) {
      this.buildOrder = newOrder
    },

    /**
     * We received an orderUpdated event for research, propagate to children
     * @param {Array} newOrder
     */
    updateResearchOrder (newOrder) {
      this.researchOrder = newOrder
    },

    /**
     * We received an orderUpdated event for research, propagate to children
     * @param {Array} newOrder
     */
    updateShipOrder (newOrder) {
      this.shipOrder = newOrder
    },

    /**
     * Update stored URL hash of build order
     */
    updateUrlHash () {
      window.location.hash = btoa(JSON.stringify([ this.buildOrder, this.researchOrder, this.shipOrder ]))
    },

    /**
     * Different versions of hashes exist, which results in the annoying fact that when people load a bookmarked buildlist, they lost their data.
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
      if (typeof data[0] === 'string') {
        data = data.map(ref => {
          return {
            turn: null,
            key: ref
          }
        })
      }

      // Migrate from v2 to v3
      if (data[0].key) {
        data = data.map(building => {
          building.ref = building.key
          delete building.key
          return building
        })
      }

      return data
    }
  }
}
</script>

<style lang="scss">
@import 'scss/app.scss';
</style>
