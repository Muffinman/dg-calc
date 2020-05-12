<template>
  <div>
    <border-box>
      <h2 slot="header" class="card-header-title">Build<strong>Order</strong>Calculator &nbsp; (first colo turn {{ first_colo_turn }})</h2>
      <table>
        <thead>
        <tr>
          <th>Turn</th>
          <th>Building</th>
          <th>Production</th>
          <th>Research</th>
          <th>Metal</th>
          <th>Mineral</th>
          <th>Energy</th>
          <th>Pop</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="turn in log" :key="turn.turn">
          <td>{{ turn.turn }}</td>
          <td><span v-if="turn.queue.building.ref">{{ buildings[turn.queue.building.ref].name }} ({{ turn.queue.building.turns }})</span></td>
          <td><span v-if="turn.queue.production.ref">{{ units[turn.queue.production.ref].name }} ({{ turn.queue.production.turns }})</span></td>
          <td><span v-if="turn.queue.research.ref">{{ research[turn.queue.research.ref].name }}</span></td>
          <td>{{ turn.stored.metal | numeral('0,0') }} ({{ turn.output.metal | numeral('+0,0') }})</td>
          <td>{{ turn.stored.mineral | numeral('0,0') }} ({{ turn.output.mineral | numeral('+0,0') }})</td>
          <td>{{ turn.stored.energy | numeral('0,0') }} ({{ turn.output.energy | numeral('+0,0') }})</td>
          <td>
            {{ (turn.stored.pop + turn.stored.pop_busy) | numeral('0,0') }}
            / {{ turn.storage.pop | numeral('0,0') }}
            ({{ turn.output.pop | numeral('+0,0') }})
            / {{ turn.stored.pop_busy | numeral('0,0') }} Busy
          </td>
        </tr>
        </tbody>
      </table>
    </border-box>
  </div>
</template>

<script>
import BorderBox from '@/components/BorderBox'
import Buildings from '@/buildings.js'
import Units from '@/units.js'
import Research from '@/research.js'

export default {
  components: {
    BorderBox
  },
  props: {
    buildOrder: Array,
    researchOrder: Array
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
       * List of units
       */
      units: Units,

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
          turns: 0
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
        farm: 0
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
      }
    }
  },

  mounted () {
    this.calcOutputAndStorage()
    this.ticks(300)
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
            this.storage[resource] += this.buildings[building].storage[resource]
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
      this.processQueues()
      if (this.turn > 1) {
        this.addOutputs()
      }
      this.startResearchQueue()
      this.startQueues()
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
     * Advance all queues
     */
    processQueues () {
      this.processBuildingQueue()
      if (this.hasShipYard()) {
        this.processProductionQueue()
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
        this.unitConstructionFinish(this.queue.production.ref)
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
     * Start construction new queue items if ready
     */
    startQueues () {
      this.startBuildingQueue()
      if (this.hasShipYard()) {
        this.startProductionQueue()
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

        if (!this.checkEnergy(next.key)) {
          this.currentBuildOrder.unshift(next)
          next = {
            turn: null,
            key: this.energyBuilding()
          }
        }

        if (!this.checkBuildingResources(next.key)) {
          this.currentBuildOrder.unshift(next)
          next = null
        }

        if (next) {
          this.buildingConstructionStart(next.key)
          this.$set(this.log[this.turn].queue, 'building', Object.assign({}, this.queue.building))
          next.turn = this.turn
        }
      }
    },

    /**
     * Find next unit for production queue
     */
    startProductionQueue () {
      if (!this.queue.production.ref) {
        let next = 'outpost_ship'

        if (!this.checkUnitResources(next)) {
          next = null
        }

        if (next) {
          this.unitConstructionStart(next)
          this.$set(this.log[this.turn].queue, 'production', Object.assign({}, this.queue.production))
        }
      }
    },

    startResearchQueue () {
      if (!this.queue.research.ref) {
        let next = this.currentResearchOrder.shift()

        if (!next) {
          return
        }

        if (!this.checkReseach(next)) {
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
     * Start construction of a unit
     * @param {String} unit
     */
    unitConstructionStart (unit) {
      Object.keys(this.units[unit].cost).forEach(resource => {
        this.stored[resource] -= this.units[unit].cost[resource]
        if (resource === 'pop') {
          this.stored.pop_busy += this.units[unit].cost[resource]
        }
      })
      this.$set(this.queue.production, 'ref', unit)
      this.$set(this.queue.production, 'turns', this.units[unit].turns)
    },

    /**
     * Process completion of a unit
     * @param {String} unit
     */
    unitConstructionFinish (unit) {
      this.stored.pop += this.units[unit].cost.pop
      this.stored.pop_busy -= this.units[unit].cost.pop
      if (!this.first_colo_turn) {
        this.first_colo_turn = this.turn + this.travel.homeworld.center
      }

      this.$set(this.queue.production, 'ref', null)
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
     * @param {String} research
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
      let canBuild = true
      Object.keys(this.buildings[building].cost).forEach(resource => {
        if (this.stored[resource] < this.buildings[building].cost[resource]) {
          canBuild = false
        }
      })
      return canBuild
    },

    /**
     * Check if the selected unit has available resources to start construction
     * @param {String} unit
     * @return {Boolean}
     */
    checkUnitResources (unit) {
      let canBuild = true
      Object.keys(this.units[unit].cost).forEach(resource => {
        if (this.stored[resource] < this.units[unit].cost[resource]) {
          canBuild = false
        }
      })
      return canBuild
    },

    /**
     * Check we can start a particular research item
     */
    checkReseach (researchItem) {
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
      let toBuild = null
      Object.keys(this.buildings).forEach(building => {
        if (this.buildings[building].output.energy > 0) {
          toBuild = building
        }
      })
      return toBuild
    },

    /**
     * Does this planet have a shipyard yet?
     * @return {Boolean}
     */
    hasShipYard () {
      return this.constructed['ship_yard'] && this.constructed['ship_yard'] > 0
    }
  }
}
</script>
