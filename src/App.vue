<template>
  <div id="app" class="flex">
    <div class="content flex justify-content-stretch scroll">
      <building-queue :order="buildOrder" @orderUpdated="updateBuildOrder"></building-queue>
      <research-queue :order="researchOrder" @orderUpdated="updateResearchOrder" :class="{ 'margin-left': true }"></research-queue>
      <calc :build-order="buildOrder" :research-order="researchOrder" :class="{ grow: true, 'margin-left': true }" :key="orderHash"></calc>
    </div>
  </div>
</template>

<script>
import Calc from './views/Calc'
import BuildingQueue from './views/BuildingQueue'
import ResearchQueue from './views/ResearchQueue'
import md5 from 'md5'

export default {
  components: {
    buildingQueue: BuildingQueue,
    researchQueue: ResearchQueue,
    calc: Calc
  },
  computed: {
    orderHash () {
      return md5(JSON.stringify(this.buildOrder) + JSON.stringify(this.researchOrder))
    }
  },
  watch: {
    buildOrder () {
      this.updateUrlHash();
    },
    researchOrder () {
      this.updateUrlHash();
    }
  },
  data () {
    return {
      buildOrder: [

      ],
      researchOrder: [

      ]
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
     * Update stored URL hash of build order
     */
    updateUrlHash () {
      window.location.hash = btoa(JSON.stringify([this.buildOrder, this.researchOrder]))
    }
  },
  mounted () {
    if (window.location.hash) {
      let loadedData = JSON.parse(atob(window.location.hash.replace('#', '')))
      this.buildOrder = loadedData[0]
      this.researchOrder = loadedData[1]
    }
  }
}
</script>

<style lang="scss">
@import 'scss/app.scss';
</style>
