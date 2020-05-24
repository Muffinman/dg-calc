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

    <h3>Abundances</h3>

    <table v-if="planet.stored">
      <tbody>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/metal.gif`"
              title="Metal"
              class="image-header"
            > Metal
          </td>
          <td class="queue-quantity">
            <input
              v-model.number="planet.abundances.metal"
              type="number"
              min="0"
              max="9999"
              step="1"
            >
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/mineral.gif`"
              title="Mineral"
              class="image-header"
            > Mineral
          </td>
          <td class="queue-quantity">
            <input
              v-model.number="planet.abundances.mineral"
              type="number"
              min="0"
              max="9999"
              step="1"
            >
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/energy.gif`"
              title="Energy"
              class="image-header"
            > Energy
          </td>
          <td class="queue-quantity">
            <input
              v-model.number="planet.abundances.energy"
              type="number"
              min="0"
              max="9999"
              step="1"
            >
          </td>
        </tr>
      </tbody>
    </table>

    <h3>Resources</h3>

    <table v-if="planet.stored">
      <tbody>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/metal.gif`"
              title="Metal"
              class="image-header"
            > Metal
          </td>
          <td class="queue-quantity">
            <input
              v-model.number="planet.stored.metal"
              type="number"
              min="0"
              max="9999"
              step="1000"
            >
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/mineral.gif`"
              title="Mineral"
              class="image-header"
            > Mineral
          </td>
          <td class="queue-quantity">
            <input
              v-model.number="planet.stored.mineral"
              type="number"
              min="0"
              max="9999"
              step="1000"
            >
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/energy.gif`"
              title="Energy"
              class="image-header"
            > Energy
          </td>
          <td class="queue-quantity">
            <input
              v-model.number="planet.stored.energy"
              type="number"
              min="0"
              max="9999"
              step="1000"
            >
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/worker.gif`"
              title="Workers"
              class="image-header"
            > Workers
          </td>
          <td class="queue-quantity">
            <input
              v-model.number="planet.stored.pop"
              type="number"
              min="0"
              max="9999"
              step="1000"
            >
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/ground.gif`"
              title="Ground Space"
              class="image-header"
            > Ground Space
          </td>
          <td class="queue-quantity">
            <input
              v-model.number="planet.stored.ground_space"
              type="number"
              min="0"
              max="9999"
              step="1"
            >
          </td>
        </tr>
        <tr>
          <td>
            <img
              :src="`${imgDG}/units/small/orbit.gif`"
              title="Orbit Space"
              class="image-header"
            > orbit Space
          </td>
          <td class="queue-quantity">
            <input
              v-model.number="planet.stored.orbit_space"
              type="number"
              min="0"
              max="9999"
              step="1"
            >
          </td>
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
    let planet = JSON.parse(JSON.stringify(this.value))

    if (!planet.colony) {
      planet.constructed = JSON.parse(JSON.stringify(ColonyPlanet.constructed))
      planet.stored = JSON.parse(JSON.stringify(ColonyPlanet.stored))
      planet.colony = true
    }

    this.$set(this, 'planet', planet)
  }
}
</script>

<style scoped>
.queue-quantity {
  text-align: right;
}
.queue-quantity input {
  background-color: #000000;
  border: 1px solid #444444;
  padding: 0.4em 0.2em;
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
