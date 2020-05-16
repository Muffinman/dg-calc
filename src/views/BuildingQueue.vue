<template>
  <div>
    <border-box>
      <h2 slot="header" class="card-header-title">Building <strong>Order</strong></h2>

      <h3>Available</h3>
      <ul class="queue">
        <li v-for="(building, index) in availableBuildings" :key="index">
          <button class="button-add" title="Add" @click="addToQueue(index)">+</button>
          <img :src="building.image" :title="building.name" class="image-queue">
          {{ building.name }}
        </li>
      </ul>

      <h3>Current Queue</h3>
      <ul class="queue draggable">
        <draggable :list="newOrder" group="buildings" @change="updateOrder">
          <li v-for="(building, index) in newOrder" :key="index">
            <input type="image" :src="`${imgDG}/queue/destroy.png`" alt="Destroy" title="Destroy" class="button-destroy" @click="removeFromQueue(index)">
            <img :src="buildings[building.ref].image" :title="buildings[building.ref].name" class="image-queue">
            {{ `${building.turn} ${buildings[building.ref].name}` }}
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
      newOrder: this.order,
      imgDG: 'https://beta.darkgalaxy.com/images'
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
      this.newOrder.push({
        turn: null,
        ref: building
      })
      this.$emit('orderUpdated', this.newOrder)
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

<style>
.image-queue {
  width: 18px;
  margin-left: 10px;
}

.button-destroy {
  width: 23px;
  vertical-align: bottom;
}

.button-add {
  background-color: black;
  color: darkgrey;
  border: none;
  cursor: pointer;
}
</style>
