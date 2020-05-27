<template>
  <border-box>
    <template slot="header">
      <h2 class="card-header-title">
        {{ planet.name }}
      </h2>
      <button
        class="card-header-icon no-border dark"
        title="Edit planet"
        @click="$emit('editClicked')"
      >
        <lead-pencil-icon />
      </button>
    </template>

    <h3>
      <img
        :src="`${imgDG}/units/small/time.gif`"
        title="Timing"
        class="image-header"
      >
      Timing
    </h3>

    <table>
      <tr>
        <td width="65%">
          Colonisation turn
        </td>
        <td>
          {{ planet.colonisation_turn }}
        </td>
      </tr>
      <tr>
        <td>
          Current time
        </td>
        <td>
          {{ currentTime.format('DD-MM-YYYY hh:mm') }}
        </td>
      </tr>
      <tr>
        <td>
          Current turn
        </td>
        <td>
          {{ currentTurn }}
        </td>
      </tr>
    </table>

    <h3>Abundances</h3>

    <table>
      <tr>
        <td width="65%">
          <img
            :src="`${imgDG}/units/small/metal.gif`"
            title="Metal"
            class="image-header"
          >
          Metal
        </td>
        <td class="resource-metal">
          {{ planet.abundances.metal }}%
        </td>
      </tr>
      <tr>
        <td>
          <img
            :src="`${imgDG}/units/small/mineral.gif`"
            title="Mineral"
            class="image-header"
          >
          Mineral
        </td>
        <td class="resource-mineral">
          {{ planet.abundances.mineral }}%
        </td>
      </tr>
      <tr>
        <td>
          <img
            :src="`${imgDG}/units/small/energy.gif`"
            title="Energy"
            class="image-header"
          >
          Energy
        </td>
        <td class="resource-energy">
          {{ planet.abundances.energy }}%
        </td>
      </tr>
    </table>

    <h3>Resources</h3>

    <table>
      <tr>
        <td width="65%">
          <img
            :src="`${imgDG}/units/small/metal.gif`"
            title="Metal"
            class="image-header"
          >
          Metal
        </td>
        <td class="resource-metal">
          {{ planet.stored.metal }}
        </td>
      </tr>
      <tr>
        <td>
          <img
            :src="`${imgDG}/units/small/mineral.gif`"
            title="Mineral"
            class="image-header"
          >
          Mineral
        </td>
        <td class="resource-mineral">
          {{ planet.stored.mineral }}
        </td>
      </tr>
      <tr>
        <td>
          <img
            :src="`${imgDG}/units/small/energy.gif`"
            title="Energy"
            class="image-header"
          >
          Energy
        </td>
        <td class="resource-energy">
          {{ planet.stored.energy }}
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
        <td class="workers">
          {{ planet.stored.pop }}
        </td>
      </tr>
      <tr>
        <td>
          <img
            :src="`${imgDG}/units/small/ground.gif`"
            title="Ground Space"
            class="image-header"
          >
          Ground Space
        </td>
        <td>
          {{ planet.stored.ground_space }}
        </td>
      </tr>
      <tr>
        <td>
          <img
            :src="`${imgDG}/units/small/orbit.gif`"
            title="Orbit Space"
            class="image-header"
          >
          Orbit Space
        </td>
        <td>
          {{ planet.stored.orbit_space }}
        </td>
      </tr>
    </table>

    <h3>Constructed</h3>

    <table>
      <tr
        v-for="(count, ref) in planet.constructed"
        :key="ref"
      >
        <td width="65%">
          <img
            :src="buildings[ref].image"
            :title="buildings[ref].name"
            class="touch-size margin-left-small"
          >
          {{ buildings[ref].name }}
        </td>
        <td>
          {{ count }}
        </td>
      </tr>
    </table>
  </border-box>
</template>

<script>
import BorderBox from '../components/BorderBox'
import Buildings from '../data/buildings.js'
import LeadPencilIcon from 'mdi-vue/LeadPencil.vue'

export default {
  components: {
    BorderBox,
    LeadPencilIcon
  },
  props: {
    planet: {
      type: Object,
      required: true
    },
    currentTime: {
      type: Object,
      required: true
    },
    currentTurn: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      /**
       * Link to the website of Dark Galaxy to get images
       */
      imgDG: 'https://beta.darkgalaxy.com/images',

      buildings: Buildings
    }
  }
}
</script>

<style scoped>
.no-border {
  border: none;
}

.dark {
  color: whitesmoke;
  background-color: #1a1a1a;
}
</style>
