<template>
  <div>
    <border-box>

      <h2 slot="header" class="card-header-title">Ship <strong>Order</strong></h2>

      <h3>Available</h3>
      <ul class="queue">
        <li v-for="(ship, ref) in available" :key="ref">
          <button class="button-add" title="Add" @click="addToQueue(ref)">+</button>
          <img :src="ship.image" :title="ship.name" class="image-queue">
          {{ ship.name }}
        </li>
      </ul>

      <h3>Current Queue</h3>
      <ul class="queue draggable">
        <draggable :list="newOrder" group="ships" @change="updateOrder">
          <li v-for="(ship, index) in newOrder" :key="index">
            <input type="image" :src="`${imgDG}/queue/destroy.png`" alt="Destroy" title="Destroy" class="button-destroy" @click="removeFromQueue(index)">
            <img :src="ships[ship.ref].image" :title="ships[ship.ref].name" class="image-queue">
            {{ `${ship.turn} ${ships[ship.ref].name}` }}
          </li>
        </draggable>
      </ul>

    </border-box>
  </div>
</template>

<script>
import BorderBox from '@/components/BorderBox'
import Ships from '@/ships.js'
import Draggable from 'vuedraggable'

export default {
  components: {
    BorderBox,
    Draggable
  },
  props: {
    order: Array,
    available: Object
  },
  data () {
    return {
      ships: Ships,
      newOrder: this.order,
      imgDG: 'https://beta.darkgalaxy.com/images'
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
     * Add a ship to the queue
     * @param {String} ship
     */
    addToQueue (ship) {
      this.newOrder.push({
        turn: null,
        ref: ship
      })
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

<style scoped>
.image-queue {
  width: 18px;
  margin-left: 3px;
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
