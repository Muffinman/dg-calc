<template>
  <div>
    <border-box>
      <h2 slot="header" class="card-header-title">Current <strong>Order</strong></h2>

      <h3>Available</h3>
      <ul class="queue">
        <li v-for="(building, index) in buildings" :key="index">
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
    buildingsArray () {
      let newArray = []
      Object.keys(this.buildings).forEach(building => {
        let buildingObject = this.buildings[building]
        buildingObject.ref = building
        newArray.push(buildingObject)
      })
      return newArray
    }
  },
  methods: {
    updateOrder() {
      this.$emit('orderUpdated', this.newOrder);
    },
    addToQueue(building) {
      this.newOrder.push(building);
    },
    removeFromQueue(index) {
      this.newOrder.splice(index, 1);
    }
  }
}
</script>
