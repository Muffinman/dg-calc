<template>
  <border-box>
    <h2
      slot="header"
      class="card-header-title"
    >
      Ship <strong>Order</strong>
    </h2>

    <h3>Available</h3>
    <p>
      <label>Quantity: <input
        v-model.number="quantity"
        type="number"
        min="1"
        max="9"
        class="queue-quantity is-pulled-right"
      ></label>
    </p>
    <ul class="queue">
      <li
        v-for="(ship, ref) in available"
        :key="ref"
      >
        <input
          :src="`${imgDG}/queue/add.png`"
          type="image"
          alt="Add"
          title="Add"
          class="touch-size vertical-align-bottom"
          @click="addToQueue(ref)"
        >
        <img
          :src="ship.image"
          :title="ship.name"
          class="touch-size margin-left-small"
        >
        {{ ship.name }}
      </li>
    </ul>

    <h3>Current Queue</h3>
    <ul class="queue draggable">
      <draggable
        :list="order"
        group="ships"
        handle=".handle"
        @change="$emit('input', order)"
      >
        <li
          v-for="(ship, index) in order"
          :key="index"
        >
          <input
            type="image"
            :src="`${imgDG}/queue/remove.png`"
            alt="Destroy"
            title="Destroy"
            class="touch-size vertical-align-bottom"
            @click="removeFromQueue(index)"
          >
          <span class="handle">
            <img
              :src="ships[ship.ref].image"
              :title="ships[ship.ref].name"
              class="touch-size margin-left-small"
            >
            {{ `${ship.turn} ${ships[ship.ref].name}` }}
          </span>
          <input
            v-model.number="ship.quantity"
            type="number"
            min="1"
            max="9"
            class="queue-quantity is-pulled-right"
            @change="handleShipInput"
            @keyup="handleShipInput"
          >
        </li>
      </draggable>
    </ul>
  </border-box>
</template>

<script>
import BorderBox from '../components/BorderBox'
import Ships from '../data/ships.js'
import Draggable from 'vuedraggable'

export default {
  components: {
    BorderBox,
    Draggable
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    log: {
      type: Array,
      required: true
    },
    available: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      ships: Ships,
      order: [],
      imgDG: 'https://beta.darkgalaxy.com/images',
      quantity: 1
    }
  },
  watch: {
    log () {
      this.$set(this, 'order', JSON.parse(JSON.stringify(this.log)))
    }
  },
  methods: {
    /**
     * Add a ship to the queue
     * @param {String} ref
     */
    addToQueue (ref) {
      let quantity = this.quantity

      // If you add wait multiple times, join the waits together
      if (ref === 'wait' && this.order.length > 0) {
        let lastOrder = this.order.slice(-1)[0]
        if (lastOrder.ref === 'wait') {
          quantity += lastOrder.quantity
          this.order.pop()
        }
      }

      this.order.push({
        ref: ref,
        quantity: quantity
      })

      this.$emit('input', this.order)
    },

    /**
     * Remove an item from the queue
     * @param {Integer} index
     */
    removeFromQueue (index) {
      this.order.splice(index, 1)
      this.$emit('input', this.order)
    },

    handleShipInput (event) {
      if (event.target.value !== '') {
        this.$emit('input', this.order)
      }
    }
  }
}
</script>
