<template>
  <div>
    <border-box>

      <h2
        slot="header"
        class="card-header-title"
      >
        Planet
      </h2>

      <h3>Resources</h3>

      <table>
        <thead>
        <tr>
          <th />
          <th>Stored</th>
          <th>Output</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><img :src="`${imgDG}/units/small/metal.gif`" title="Metal" class="image-header"> Metal</td>
          <td class="resource-metal">{{ planet.stored.metal }}</td>
          <td class="resource-metal">{{ planet.abundances.metal*100 }}%</td>
        </tr>
        <tr>
          <td><img :src="`${imgDG}/units/small/mineral.gif`" title="Mineral" class="image-header"> Mineral</td>
          <td class="resource-mineral">{{ planet.stored.mineral }}</td>
          <td class="resource-mineral">{{ planet.abundances.mineral*100 }}%</td>
        </tr>
        <tr>
          <td><img :src="`${imgDG}/units/small/energy.gif`" title="Energy" class="image-header"> Energy</td>
          <td class="resource-energy">{{ planet.stored.energy }}</td>
          <td class="resource-energy">{{ planet.abundances.energy*100 }}%</td>
        </tr>
        <tr>
          <td><img :src="`${imgDG}/units/small/worker.gif`" title="Workers" class="image-header"> Workers</td>
          <td class="workers">{{ planet.stored.pop }}</td>
          <td />
        </tr>
        </tbody>
      </table>
    </border-box>
  </div>
</template>

<script>
import BorderBox from '@/components/BorderBox'
import HomePlanet from '@/home_planet.js'
import ColonyPlanet from '@/colony_planet.js'

export default {
  components: {
    BorderBox
  },
  props: {
    planetType: String
  },
  data () {
    return {
      /**
       * Link to the website of Dark Galaxy to get images
       */
      imgDG: 'https://beta.darkgalaxy.com/images'
    }
  },
  computed: {
    planet () {
      switch (this.planetType) {
        case 'colony':
          return JSON.parse(JSON.stringify(ColonyPlanet))
        case 'home':
        default:
          return JSON.parse(JSON.stringify(HomePlanet))
      }
    }
  }
}
</script>
