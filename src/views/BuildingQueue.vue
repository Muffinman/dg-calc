<template>
  <div>
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
          :list="newOrder"
          group="buildings"
          handle=".handle"
          @change="updateOrder"
        >
          <li
            v-for="(building, index) in newOrder"
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
    value: Array,
    log: Array,
    available: Object
  },
  data () {
    return {
      buildings: Buildings,
      imgDG: 'https://beta.darkgalaxy.com/images',
      newOrder: []
    }
  },
  watch: {
    log () {
      this.newOrder = JSON.parse(JSON.stringify(this.log))
    }
  },
  methods: {
    /**
     * Emit the updated queue order to the parent
     */
    updateOrder () {
      this.$emit('input', this.newOrder)
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
      this.$emit('input', this.newOrder)
    },

    /**
     * Remove an item from the queue
     * @param {Integer} index
     */
    removeFromQueue (index) {
      this.newOrder.splice(index, 1)
      this.$emit('input', this.newOrder)
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
