<template>
  <border-box>
    <template slot="header">
      <h2 class="card-header-title">
        Planet
      </h2>
      <button
        class="card-header-icon no-border dark"
        title="Confirm"
        @click="$emit('input', planet)"
      >
        <check-bold-icon />
      </button>
    </template>

    <table v-if="planet.stored">
      <thead>
        <tr>
          <th />
          <th>Stored</th>
          <th>Abundance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/metal.gif`"
              title="Metal"
              class="image-header"
            >
          </td>
          <td class="resource-metal">
            <input
              v-model.number="planet.stored.metal"
              type="number"
              min="0"
              step="1000"
              class="queue-quantity"
            >
          </td>
          <td class="resource-metal">
            <input
              v-model.number="planet.abundances.metal"
              type="number"
              min="0"
              step="1"
              class="queue-quantity"
            >
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/mineral.gif`"
              title="Mineral"
              class="image-header"
            >
          </td>
          <td class="resource-mineral">
            <input
              v-model.number="planet.stored.mineral"
              type="number"
              min="0"
              step="1000"
              class="queue-quantity"
            >
          </td>
          <td class="resource-mineral">
            <input
              v-model.number="planet.abundances.mineral"
              type="number"
              min="0"
              step="1"
              class="queue-quantity"
            >
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/energy.gif`"
              title="Energy"
              class="image-header"
            >
          </td>
          <td class="resource-energy">
            <input
              v-model.number="planet.stored.energy"
              type="number"
              min="0"
              step="1000"
              class="queue-quantity"
            >
          </td>
          <td class="resource-energy">
            <input
              v-model.number="planet.abundances.energy"
              type="number"
              min="0"
              step="1"
              class="queue-quantity"
            >
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/worker.gif`"
              title="Workers"
              class="image-header"
            >
          </td>
          <td class="workers">
            <input
              v-model.number="planet.stored.pop"
              type="number"
              min="0"
              step="1000"
              class="queue-quantity"
            >
          </td>
          <td />
        </tr>
      </tbody>
    </table>
  </border-box>
</template>

<script>
import BorderBox from '../components/BorderBox'
import CheckBoldIcon from 'mdi-vue/CheckBold.vue'
import ColonyPlanet from '../data/colony_planet.js'

export default {
  components: {
    BorderBox,
    CheckBoldIcon
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      planet: {},

      /**
       * Link to the website of Dark Galaxy to get images
       */
      imgDG: 'https://beta.darkgalaxy.com/images'
    }
  },
  mounted () {
    let colonyPlanet = JSON.parse(JSON.stringify(this.value))
    colonyPlanet.constructed = JSON.parse(JSON.stringify(ColonyPlanet.constructed))
    colonyPlanet.stored = JSON.parse(JSON.stringify(ColonyPlanet.stored))

    this.$set(this, 'planet', colonyPlanet)
  }
}
</script>

<style scoped>
.queue-quantity {
  background-color: #000000;
  border: 1px solid #444444;
  padding: 0.4em 0.2em;
  width: 65px;
  display: inline-block;
  color: #FFFFFF;
  text-align: center;
}

.no-border {
  border: none;
}

.dark {
  color: whitesmoke;
  background-color: #1a1a1a;
}
</style>
