<template>
  <border-box>
    <template slot="header">
      <h2 class="card-header-title">
        Planet
      </h2>
      <button
        class="card-header-icon no-border dark"
        title="Edit planets stats for a colonised planet"
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
      <tbody>
        <tr>
          <td>
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
      </tbody>
    </table>

    <h3>Abundances</h3>

    <table>
      <tbody>
        <tr>
          <td width="50%">
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
      </tbody>
    </table>

    <h3>Resources</h3>

    <table>
      <tbody>
        <tr>
          <td width="50%">
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
      </tbody>
    </table>
  </border-box>
</template>

<script>
import BorderBox from '../components/BorderBox'
import LeadPencilIcon from 'mdi-vue/LeadPencil.vue'
import moment from 'moment'

export default {
  components: {
    BorderBox,
    LeadPencilIcon
  },
  props: {
    planet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      /**
       * Link to the website of Dark Galaxy to get images
       */
      imgDG: 'https://beta.darkgalaxy.com/images',

      startOfGame: moment('2020-05-22 20:00'),
      currentTime: moment()
    }
  },
  computed: {
    currentTurn () {
      return this.currentTime.diff(this.startOfGame, 'hours')
    }
  },
  mounted () {
    this.$options.interval = setInterval(this.updateCurrentTime, 1000)
  },
  methods: {
    updateCurrentTime () {
      if (this.currentTime.seconds() === 0) {
        this.$set(this, 'currentTime', moment())
      }
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
