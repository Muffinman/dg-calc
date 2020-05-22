<template>
  <div>
    <planet-view
      v-if="!editing && planet.abundances"
      v-model="editing"
      :planet="planet"
    />
    <planet-edit
      v-else
      v-model="planet"
    />
  </div>
</template>

<script>
import PlanetEdit from '../components/PlanetEdit'
import PlanetView from '../components/PlanetView'

export default {
  components: {
    PlanetEdit,
    PlanetView
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editing: false,
      planet: {}
    }
  },
  mounted () {
    this.$set(this, 'planet', JSON.parse(JSON.stringify(this.value)))
  },
  watch: {
    planet: {
      deep: true,
      handler () {
        this.$set(this, 'editing', false)
        this.$emit('input', this.planet)
      }
    }
  }
}
</script>
