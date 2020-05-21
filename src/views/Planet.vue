<template>
  <div>
    <planet-view
      v-if="!editing && planet.stored"
      v-model="editing"
      :planet="planet"
    />
    <planet-edit
      v-else-if="planet.stored"
      v-model="planet"
    />
  </div>
</template>

<script>
import HomePlanet from '@/home_planet.js'
import ColonyPlanet from '@/colony_planet.js'
import PlanetEdit from './PlanetEdit'
import PlanetView from './PlanetView'

export default {
  components: {
    PlanetEdit,
    PlanetView
  },
  props: {
    planetType: String
  },
  data () {
    return {
      planet: {},
      editing: false
    }
  },
  mounted () {
    this.setPlanet()
  },
  watch: {
    planetType () {
      console.log('aaa')
      this.setPlanet()
    },
    planet: {
      deep: true,
      handler () {
        this.$set(this, 'editing', false)
      }
    }
  },
  methods: {
    setPlanet () {
      switch (this.planetType) {
        case 'colony':
          this.$set(this, 'planet', JSON.parse(JSON.stringify(ColonyPlanet)))
          break
        case 'home':
        default:
          this.$set(this, 'planet', JSON.parse(JSON.stringify(HomePlanet)))
          break
      }
    }
  }
}
</script>

<style>
.no-border {
  border: none;
}

.dark {
  color: whitesmoke;
  background-color: #1a1a1a;
}
</style>
