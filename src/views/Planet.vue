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
import HomePlanet from '@/data/home_planet.js'
import PlanetEdit from './PlanetEdit'
import PlanetView from './PlanetView'

export default {
  components: {
    PlanetEdit,
    PlanetView
  },
  data () {
    return {
      planet: {},
      editing: false
    }
  },
  mounted () {
    this.$set(this, 'planet', JSON.parse(JSON.stringify(HomePlanet)))
  },
  watch: {
    planet: {
      deep: true,
      handler () {
        this.$set(this, 'editing', false)
      }
    }
  },
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
