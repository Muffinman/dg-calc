<template>
  <div id="app" class="flex">
    <div class="content flex justify-content-stretch scroll">
      <building-queue :order="buildOrder" @orderUpdated="updateBuildOrder"/>
      <div class="margin-left">
        <research-queue :order="researchOrder" @orderUpdated="updateResearchOrder"/>
        <ship-queue :order="shipOrder" :buildings="constructedBuildingsForShips" @orderUpdated="updateShipOrder" class="margin-top"/>
      </div>
      <calc :build-order="buildOrder" :research-order="researchOrder" :ship-order="shipOrder" class="grow margin-left" :key="orderHash"/>
    </div>
  </div>
</template>

<script>
import Calc from './views/Calc'
import BuildingQueue from './views/BuildingQueue'
import ResearchQueue from './views/ResearchQueue'
import ShipQueue from './views/ShipQueue'
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
    constructedBuildingsForShips () {
      return [
        'ship_yard',
        'light_weapons_factory',
        'heavy_weapons_factory',
        'space_dock',
        'holo_generator'
      ].filter(building => {
        return this.buildingIsConstructed(building)
      })
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
      shipOrder: []
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
      window.location.hash = btoa(JSON.stringify([this.buildOrder, this.researchOrder, this.shipOrder]))
    },

    /**
     * Check if a building is constructed
     * @param {string} building
     */
    buildingIsConstructed (building) {
      return this.buildOrder.some(({ key }) => {
        return key === building
      })
    }
  },
  mounted () {
    if (window.location.hash) {
      let loadedData = JSON.parse(atob(window.location.hash.replace('#', '')))
      this.$set(this, 'buildOrder', loadedData[0])
      this.$set(this, 'researchOrder', loadedData[1])
      this.$set(this, 'shipOrder', loadedData[2] === undefined ? [] : loadedData[2])
    }
  }
}
</script>

<style lang="scss">
@import 'scss/app.scss';
</style>
