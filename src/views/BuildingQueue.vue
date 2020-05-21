<template>
  <border-box>

    <h2
      slot="header"
      class="card-header-title"
    >
      Building <strong>Order</strong>
    </h2>

    <h3>Available</h3>
    <ul class="queue">
      <li
        v-for="(building, ref) in available"
        :key="ref"
      >
        <button
          class="button-add"
          title="Add"
          @click="addToQueue(ref)"
        >
          +
        </button>
        <img
          :src="building.image"
          :title="building.name"
          class="image-queue"
        >
        {{ building.name }}
      </li>
    </ul>

    <h3>Current Queue</h3>
    <ul class="queue draggable">
      <draggable
        :list="order"
        group="buildings"
        handle=".handle"
        @change="emitOrder"
      >
        <li
          v-for="(building, index) in order"
          :key="index"
        >
          <input
            :src="`${imgDG}/queue/destroy.png`"
            :disabled="!buildings[building.ref].canBuild"
            :class="{ hidden: !buildings[building.ref].canBuild }"
            type="image"
            alt="Destroy"
            title="Destroy"
            class="button-destroy"
            @click="removeFromQueue(index)"
          >
          <span :class="{ handle: buildings[building.ref].canBuild }">
            <img
              :src="buildings[building.ref].image"
              :title="buildings[building.ref].name"
              class="image-queue"
            >
              {{ `${building.turn} ${buildings[building.ref].name}` }}
          </span>
        </li>
      </draggable>
    </ul>

  </border-box>
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
    value: Array,
    log: Array,
    available: Object
  },
  data () {
    return {
      buildings: Buildings,
      imgDG: 'https://beta.darkgalaxy.com/images',
      order: []
    }
  },
  watch: {
    log () {
      this.$set(this, 'order', JSON.parse(JSON.stringify(this.log)))
    }
  },
  methods: {
    /**
     * Emit the updated queue order to the parent.
     * This is actually the ouput of the log, optionally with a change for removing or adding a building.
     * In the calculation, energy buildings are added automatically so we don't want them to be part of the order.
     */
    emitOrder () {
      this.$emit('input', this.order.filter(
        ({ ref }) => this.buildings[ref].output['energy'] <= 0
      ))
    },

    /**
     * Add a building to the queue
     * @param {String} building
     */
    addToQueue (building) {
      this.order.push({ ref: building })
      this.emitOrder()
    },

    /**
     * Remove an item from the queue
     * @param {Integer} index
     */
    removeFromQueue (index) {
      this.order.splice(index, 1)
      this.emitOrder()
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

.hidden {
  visibility: hidden;
}

.button-add {
  background-color: black;
  color: darkgrey;
  border: none;
  cursor: pointer;
}
</style>
