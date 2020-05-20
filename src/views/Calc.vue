<template>
  <div>
    <border-box>
      <h2 slot="header" class="card-header-title">Build<strong>Order</strong>Calculator &nbsp; (first colo turn {{ first_colo_turn }})</h2>
      <table>
        <thead>
        <tr>
          <th><img :src="`${imgDG}/units/small/time.png`" title="Turn" class="image-header"></th>
          <th><img :src="`${imgDG}/buttons/construction.png`" title="Building" class="image-header"> Building</th>
          <th><img :src="`${imgDG}/buttons/production.png`" title="Production" class="image-header"> Production</th>
          <th><img :src="`${imgDG}/icons/research_small.png`" title="Research" class="image-header"> Research</th>
          <th><img :src="`${imgDG}/units/small/metal.gif`" title="Metal" class="image-header"> Metal</th>
          <th><img :src="`${imgDG}/units/small/mineral.gif`" title="Mineral" class="image-header"> Mineral</th>
          <th><img :src="`${imgDG}/units/small/energy.gif`" title="Energy" class="image-header"> Energy</th>
          <th><img :src="`${imgDG}/units/small/worker.gif`" title="Population" class="image-header"> Population</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="turn in log" :key="turn.turn">
          <td>{{ turn.turn }}</td>
          <td><span v-if="turn.queue.building.ref">{{ buildings[turn.queue.building.ref].name }} ({{ turn.queue.building.turns }})</span></td>
          <td><span v-if="turn.queue.production.ref">{{turn.queue.production.quantity}} {{ ships[turn.queue.production.ref].name }} ({{ turn.queue.production.turns }})</span></td>
          <td><span v-if="turn.queue.research.ref">{{ research[turn.queue.research.ref].name }}</span></td>
          <td class="metal">{{ turn.stored.metal | numeral('0,0') }} ({{ turn.output.metal | numeral('+0,0') }})</td>
          <td class="mineral">{{ turn.stored.mineral | numeral('0,0') }} ({{ turn.output.mineral | numeral('+0,0') }})</td>
          <td class="energy">{{ turn.stored.energy | numeral('0,0') }} ({{ turn.output.energy | numeral('+0,0') }})</td>
          <td>
            {{ (turn.stored.pop + turn.stored.pop_busy) | numeral('0,0') }}
            / {{ turn.storage.pop | numeral('0,0') }}
            <span class="population">({{ turn.output.pop | numeral('+0,0') }}) </span>
            <span class="neutral">({{ turn.stored.pop_busy | numeral('0,0') }} occupied)</span>
          </td>
        </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>Asset Score</td>
            <td>Outposts</td>
            <td></td>
            <td colspan="4">Total Output</td>
          </tr>
          <tr>
            <td></td>
            <td>{{ totalScore }}</td>
            <td>{{ totalOutposts }}</td>
            <td></td>
            <td><img :src="`${imgDG}/units/small/metal.gif`" title="Metal" class="image-header"> {{ totalResource('metal') | numeral('0,0') }}</td>
            <td><img :src="`${imgDG}/units/small/mineral.gif`" title="Mineral" class="image-header"> {{ totalResource('mineral') | numeral('0,0') }}</td>
            <td><img :src="`${imgDG}/units/small/energy.gif`" title="Energy" class="image-header"> {{ totalResource('energy') | numeral('0,0') }}</td>
            <td><img :src="`${imgDG}/units/small/worker.gif`" title="Population" class="image-header"> {{ totalResource('pop') | numeral('0,0') }}</td>
          </tr>
        </tfoot>
      </table>
    </border-box>
  </div>
</template>

<script>
import BorderBox from '@/components/BorderBox'
import Buildings from '@/data/buildings.js'
import Ships from '@/data/ships.js'
import Research from '@/data/research.js'

export default {
  components: {
    BorderBox
  },
  props: {
    buildOrder: Array,
    researchOrder: Array,
    shipOrder: Array
  },
  data () {
    return {

      /**
       * Current tick/turn
       */
      turn: 0,

      /**
       * Debug log
       */
      log: {},

      /**
       * Current first colo turn
       */
      first_colo_turn: 0,

      /**
       * List of resources
       */
      resources: [
        'metal',
        'mineral',
        'energy',
        'pop',
        'research'
      ],

      /**
       * Current building order
       */
      currentBuildOrder: Object.assign([], this.buildOrder),

      /**
       * Current research order
       */
      currentResearchOrder: Object.assign([], this.researchOrder),

      /**
       * Current ship order
       */
      currentShipOrder: Object.assign([], this.shipOrder),

      /**
       * Current stored planet resources
       */
      stored: {
        metal: 30000,
        mineral: 20000,
        energy: 1000,
        pop: 20000,
        pop_busy: 0,
        research: 0
      },

      /**
       * Current resource storage limits
       */
      storage: {
        pop: 0
      },

      /**
       * Current calculated planet output
       */
      output: {
        metal: 0,
        mineral: 0,
        energy: 0,
        pop: 0,
        research: 0
      },

      /**
       * Home planet abundances
       */
      abundancies: {
        metal: 0.7,
        mineral: 0.7,
        energy: 0.7,
        pop: 1,
        research: 1
      },

      /**
       * List of ships
       */
      ships: Ships,

      /**
       * List of buildings
       */
      buildings: Buildings,

      /**
       * List of research
       */
      research: Research,

      /**
       * Current queues
       */
      queue: {
        building: {
          ref: null,
          turns: 0
        },
        production: {
          ref: null,
          turns: 0,
          quantity: 0
        },
        research: {
          ref: null,
          turns: 0
        }
      },

      /**
       * Completed structures
       */
      constructed: {
        outpost: 1,
        metal_mine: 3,
        mineral_extractor: 3,
        solar_generator: 2,
        farm: 0,
        launch_site: 0,
        ship_yard: 0,
        comms_satellite: 0,
        light_weapons_factory: 0,
        army_barracks: 0,
        colony: 0,
        metropolis: 0,
        space_dock: 0,
        heavy_weapons_factory: 0
      },

      /**
       * Completed research
       */
      researched: [],

      /**
       * Calculated research bonuses
       */
      researchBonus: {
        metal: 1,
        mineral: 1,
        pop: 1,
        energy: 1,
        research: 1
      },

      /**
       * Syntax:
       * source: { destination: turns }
       */
      travel: {
        homeworld: {
          center: 24,
          inner: 24,
          outer: 24,
          homeworld: 24
        },
        center: {
          center: 12,
          inner: 20,
          outer: 28,
          homeworld: 24
        },
        inner: {
          center: 12,
          inner: 12,
          outer: 20,
          homeworld: 24
        },
        outer: {
          center: 16,
          inner: 16,
          outer: 12,
          homeworld: 24
        }
      },

      /**
       * Link to the website of Dark Galaxy to get images
       */
      imgDG: 'https://beta.darkgalaxy.com/images'
    }
  },

  computed: {
    totalScore () {
      return 'Coming soon'
    },

    totalOutposts () {
      let turn = 1
      let count = 0
      while (this.log[turn]) {
        let prod = this.log[turn].queue.production
        if (prod.ref === 'outpost_ship' && prod.turns === 16) {
          count += prod.quantity
        }
        turn++
      }
      return count
    }
  },

  mounted () {
    this.calcOutputAndStorage()
    this.ticks(300)

    this.$emit('logUpdated', Object.values(this.log))
  },

  methods: {

    /**
     * Reset all outputs to 0
     */
    resetOutput () {
      this.output = {
        metal: 0,
        mineral: 0,
        energy: 0,
        pop: 0,
        research: 0
      }
    },

    /**
     * Reset all storage to 0
     */
    resetStorage () {
      this.storage = {
        pop: 0
      }
    },

    /**
     * Re-calculate current planet output
     */
    calcOutputAndStorage () {
      this.resetOutput()
      this.resetStorage()

      Object.keys(this.constructed).forEach(building => {
        this.resources.forEach(resource => {
          // Calc outputs
          let resourceOutput = this.constructed[building] * this.buildings[building].output[resource]

          // Take into account abundancy if not an energy cost or research
          if (resource !== 'energy' || this.buildings[building].output[resource] > 0) {
            resourceOutput *= this.abundancies[resource]
          }
          if (resource !== 'research' && resource !== 'energy') {
            resourceOutput *= this.researchBonus[resource]
          }
          this.output[resource] += resourceOutput

          // Calc storages, only do this for pop at the moment
          if (resource === 'pop') {
            this.storage[resource] += this.constructed[building] * this.buildings[building].storage[resource]
          }
        })
      })
    },

    /**
     * Update stored resources with current outputs
     */
    addOutputs () {
      this.resources.forEach(resource => {
        this.stored[resource] += this.output[resource]
        if (resource === 'pop' && (this.stored.pop + this.stored.pop_busy) > this.storage.pop) {
          this.stored.pop = this.storage.pop - this.stored.pop_busy
        }
      })
    },

    /**
     * Put current planet outputs into log
     */
    recordOutputs () {
      this.$set(this.log, this.turn, {
        turn: this.turn,
        output: JSON.parse(JSON.stringify(this.output)),
        stored: JSON.parse(JSON.stringify(this.stored)),
        storage: JSON.parse(JSON.stringify(this.storage)),
        queue: JSON.parse(JSON.stringify(this.queue))
      })
    },

    /**
     * Main tick controller method
     */
    tick () {
      this.turn++

      this.recordOutputs()

      this.processBuildingQueue()
      this.processProductionQueue()

      if (this.turn > 1) {
        this.addOutputs()
      }

      this.startResearchQueue()
      this.startBuildingQueue()
      this.startProductionQueue()

      this.recordOutputs()

      this.finishResearchQueue()
    },

    /**
     * Advance {count} ticks
     * @param {Integer} count
     */
    ticks (count) {
      for (let i = 0; i < count; i++) {
        this.tick()
      }
    },

    /**
     * Advance or complete building queue
     */
    processBuildingQueue () {
      if (this.queue.building.turns > 0) {
        this.queue.building.turns--
      }
      if (this.queue.building.turns === 0 && this.queue.building.ref) {
        this.buildingConstructionFinish(this.queue.building.ref)
      }
    },

    /**
     * Advance or complete production queue
     */
    processProductionQueue () {
      if (this.queue.production.turns > 0) {
        this.queue.production.turns--
      }
      if (this.queue.production.turns === 0 && this.queue.production.ref) {
        this.shipConstructionFinish(this.queue.production.ref, this.queue.production.quantity)
      }
    },

    /**
     * Advance or complete research queue
     */
    finishResearchQueue () {
      if (this.queue.research.ref) {
        this.researchFinish(this.queue.research.ref)
      }
    },

    /**
     * Find next building for building queue
     */
    startBuildingQueue () {
      if (!this.queue.building.ref) {
        let next = this.currentBuildOrder.shift()

        if (!next) {
          return
        }

        if (!this.checkEnergy(next.ref)) {
          this.currentBuildOrder.unshift(next)
          next = {
            turn: null,
            ref: this.energyBuilding()
          }
        }

        if (!this.checkBuildingResources(next.ref) || !this.checkBuildingBuildings(next.ref)) {
          this.currentBuildOrder.unshift(next)
          return
        }

        this.buildingConstructionStart(next.ref)
        this.$set(this.log[this.turn].queue, 'building', Object.assign({}, this.queue.building))
        next.turn = this.turn
      }
    },

    /**
     * Find next ship for production queue
     */
    startProductionQueue () {
      if (!this.queue.production.ref) {
        let next = this.currentShipOrder.shift()

        if (!next) {
          return
        }

        if (!this.checkShipResources(next.ref, next.quantity) || !this.checkShipBuildings(next.ref)) {
          this.currentShipOrder.unshift(next)
          return
        }

        this.shipConstructionStart(next.ref, next.quantity)
        this.$set(this.log[this.turn].queue, 'production', Object.assign({}, this.queue.production))
        next.turn = this.turn
      }
    },

    startResearchQueue () {
      if (!this.queue.research.ref) {
        let next = this.currentResearchOrder.shift()

        if (!next) {
          return
        }

        if (!this.checkResearch(next)) {
          this.currentResearchOrder.unshift(next)
          next = null
        }

        if (next) {
          this.researchStart(next)
          this.$set(this.log[this.turn].queue, 'research', Object.assign({}, this.queue.research))
        }
      }
    },

    /**
     * Start construction of a building
     * @param {String} building
     */
    buildingConstructionStart (building) {
      Object.keys(this.buildings[building].cost).forEach(resource => {
        this.stored[resource] -= this.buildings[building].cost[resource]
        if (resource === 'pop') {
          this.stored.pop_busy += this.buildings[building].cost[resource]
        }
      })
      this.$set(this.queue.building, 'ref', building)
      this.$set(this.queue.building, 'turns', this.buildings[building].turns)
    },

    /**
     * Process completion of a building
     * @param {String} building
     */
    buildingConstructionFinish (building) {
      if (this.constructed[building]) {
        this.constructed[building]++
      } else {
        this.$set(this.constructed, building, 1)
      }
      this.stored.pop += this.buildings[building].cost.pop
      this.stored.pop_busy -= this.buildings[building].cost.pop
      this.calcOutputAndStorage()

      this.$set(this.queue.building, 'ref', null)
      this.$set(this.queue.building, 'turns', 0)
    },

    /**
     * Start construction of a ship
     * @param {String} ref
     * @param {Number} quantity
     */
    shipConstructionStart (ref, quantity) {
      Object.keys(this.ships[ref].cost).forEach(resource => {
        switch (ref) {
          case 'wait':
            this.$set(this.queue.production, 'turns', quantity)
            break
          default: {
            this.stored[resource] -= this.ships[ref].cost[resource] * quantity
            if (resource === 'pop') {
              this.stored.pop_busy += this.ships[ref].cost[resource] * quantity
            }
            this.$set(this.queue.production, 'turns', this.ships[ref].turns)
          }
        }
      })
      this.$set(this.queue.production, 'ref', ref)
      this.$set(this.queue.production, 'quantity', quantity)
    },

    /**
     * Process completion of a ship
     * @param {String} ship
     * @param {Number} quantity
     */
    shipConstructionFinish (ship, quantity) {
      this.stored.pop += this.ships[ship].cost.pop * quantity
      this.stored.pop_busy -= this.ships[ship].cost.pop * quantity
      if (!this.first_colo_turn && ship === 'outpost_ship') {
        this.first_colo_turn = this.turn + this.travel.homeworld.center
      }

      this.$set(this.queue.production, 'ref', null)
      this.$set(this.queue.production, 'quantity', 0)
      this.$set(this.queue.production, 'turns', 0)
    },

    /**
     * Process start of research
     * @param {String} research
     */
    researchStart (research) {
      this.stored.research -= this.research[research].cost
      this.$set(this.queue.research, 'ref', research)
      this.$set(this.queue.research, 'turns', 0)
    },

    /**
     * Process completion of research
     * @param {String} researchItem
     */
    researchFinish (researchItem) {
      this.researched.push(researchItem)
      this.researchBonus[this.research[researchItem].affects] += this.research[researchItem].bonus
      this.$set(this.queue.research, 'ref', null)
      this.$set(this.queue.research, 'turns', 0)
      this.calcOutputAndStorage()
    },

    /**
     * Check if the selected building has available energy to start construction
     * @param {String} building
     */
    checkEnergy (building) {
      let required = -this.buildings[building].output.energy
      let available = this.output.energy
      return required <= available
    },

    /**
     * Check if the selected building has available resources to start construction
     * @param {String} building
     */
    checkBuildingResources (building) {
      return Object
        .keys(this.buildings[building].cost)
        .every(resource => this.stored[resource] >= this.buildings[building].cost[resource])
    },

    /**
     * Check if the selected ship has available resources to start construction
     * @param {String} ship
     * @param {Number} quantity
     * @return {Boolean}
     */
    checkShipResources (ship, quantity) {
      return Object
        .keys(this.ships[ship].cost)
        .every(resource => this.stored[resource] >= this.ships[ship].cost[resource] * quantity)
    },

    /**
     * Check if the selected ship has available buildings to start construction
     * @param {String} ship
     * @return {Boolean}
     */
    checkShipBuildings (ship) {
      return Object
        .values(this.ships[ship].requires.buildings)
        .every(building => this.constructed[building])
    },

    /**
     * Check if the selected building has available buildings to start construction
     * @param {String} toBuild
     * @return {Boolean}
     */
    checkBuildingBuildings (toBuild) {
      return Object
        .values(this.buildings[toBuild].requires.buildings)
        .every(building => this.constructed[building])
    },

    /**
     * Check we can start a particular research item
     */
    checkResearch (researchItem) {
      if (this.research[researchItem].cost > this.stored.research) {
        return false
      }
      if (this.research[researchItem].requires !== null && this.researched.indexOf(this.research[researchItem].requires) === -1) {
        return false
      }
      return true
    },

    /**
     * Get the best energy producing building to construct
     * @return {String}
     */
    energyBuilding () {
      return Object
        .keys(this.buildings)
        .reduce((best, building) => {
          if (!this.checkBuildingBuildings(building) || !this.checkBuildingResources(building)) {
            return best
          }

          if (this.buildings[building].output.energy > this.buildings[best].output.energy) {
            return building
          }

          return best
        })
    },

    totalResource (resource) {
      return Object
        .values(this.log)
        .reduce((total, turn) => total + turn.output[resource], 0)
    }
  }
}
</script>

<style scoped>
.image-header {
  width: 17px;
}

.metal {
  color: #EEEEEE;
}

.mineral {
  color: #E33E4C;
}

.energy {
  color: #6596DA;
}

.population {
  color: #EAC861;
}

.neutral {
  color: #9B9B9B;
}
</style>
