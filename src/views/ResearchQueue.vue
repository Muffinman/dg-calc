<template>
  <div>
    <border-box>
      <h2 slot="header" class="card-header-title">Research <strong>Order</strong></h2>

      <h3>Available</h3>
      <ul class="queue">
        <li v-for="(item, index) in availableResearch" :key="index">
          <button class="button-add" title="Add" @click="addToQueue(item.ref)">+</button>
          <img :src="item.image" :title="item.name" class="image-queue">
          {{ item.name }}
        </li>
      </ul>

      <h3>Current Queue</h3>
      <ul class="queue draggable">
        <draggable :list="newOrder" group="research" @change="updateOrder">
          <li v-for="(item, index) in newOrder" :key="index">
            <input type="image" :src="`${imgDG}/queue/destroy.png`" alt="Destroy" title="Destroy" class="button-destroy" @click="removeFromQueue(index)">
            <img :src="research[item].image" :title="research[item].name" class="image-queue">
            {{ research[item].name }}
          </li>
        </draggable>
      </ul>

    </border-box>
  </div>
</template>

<script>
import BorderBox from '@/components/BorderBox'
import Research from '@/research.js'
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
      research: Research,
      newOrder: this.order,
      imgDG: 'https://beta.darkgalaxy.com/images'
    }
  },
  computed: {
    availableResearch () {
      let available = []

      for (let ref in this.research) {
        let item = this.research[ref]
        item.ref = ref
        if ((item.requires === null || this.newOrder.indexOf(item.requires) !== -1) && this.newOrder.indexOf(item.ref) === -1) {
          available.push(item)
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
     * Add a research to the queue
     * @param {String} item
     */
    addToQueue (item) {
      this.newOrder.push(item)
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
