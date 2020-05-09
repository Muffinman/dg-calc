<template>
  <div>
    <border-box>
      <h2 slot="header" class="card-header-title">Building <strong>Order</strong></h2>

      <h3>Available</h3>
      <ul class="queue">
        <li v-for="(building, index) in availableBuildings" :key="index">
          <button @click="addToQueue(index)">+</button> {{ building.name }}
        </li>
      </ul>

      <h3>Current Queue</h3>
      <ul class="queue draggable">
        <draggable :list="newOrder" group="buildings" @change="updateOrder">
          <li v-for="(building, index) in newOrder" :key="index">
            <button @click="removeFromQueue(index)">x</button> {{ buildings[building].name }}
          </li>
        </draggable>
      </ul>

    </border-box>
  </div>
</template>

<script>
import BorderBox from '@/components/BorderBox'
import Buildings from '@/buildings.js'
import Draggable from 'vuedraggable'

export default {
  components: {
    BorderBox,
    Draggable
  },
  props: {
    order: Array
  },
  data () {
    return {
      buildings: Buildings,
      newOrder: this.order
    }
  },
  computed: {
    availableBuildings () {
      let available = Object.assign({}, this.buildings)
      for (let building in available) {
        if (!available[building].canBuild) {
          delete available[building]
        }
      }
      return available
    }
  },
  watch: {
    order () {
      this.newOrder = this.order
    }
  },
  methods: {
    /**
     * Emit the updated queue order to the parent
     */
    updateOrder () {
      this.$emit('orderUpdated', this.newOrder)
    },

    /**
     * Add a building to the queue
     * @param {String} building
     */
    addToQueue (building) {
      this.newOrder.push(building)
    },

    /**
     * Remove an item from the queue
     * @param {Integer} index
     */
    removeFromQueue (index) {
      this.newOrder.splice(index, 1)
    }
  }
}
</script>
