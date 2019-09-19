<template>
  <div id="app" class="flex">
    <div class="content flex justify-content-stretch scroll">
      <queue :order="buildOrder" :class="{ sticky: true }" @orderUpdated="updateOrder"></queue>
      <calc :order="buildOrder" :class="{ grow: true, 'margin-left': true }" :key="JSON.stringify(buildOrder)"></calc>
    </div>
  </div>
</template>

<script>
import Calc from './views/Calc'
import Queue from './views/Queue'

export default {
  components: {
    calc: Calc,
    queue: Queue
  },
  data () {
    return {
      test: false,
      buildOrder: [

      ]
    }
  },
  methods: {

    /**
     * We received an orderUpdated event, propagate to children
     * @param {Array} newOrder
     */
    updateOrder(newOrder) {
      this.buildOrder = newOrder;
    }
  }
}
</script>

<style lang="scss">
@import 'scss/app.scss';
</style>
