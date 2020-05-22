<template>
  <div>
    <planet-edit
      v-if="editing"
      v-model="planet"
    />
    <planet-view-component
      v-else-if="planet"
      :planet="planet"
      @editClicked="editing = true"
    />
  </div>
</template>

<script>
import PlanetEdit from '../components/PlanetEdit'
import PlanetViewComponent from '../components/PlanetView'

export default {
  components: {
    PlanetEdit,
    PlanetViewComponent
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
      planet: null
    }
  },
  watch: {
    planet: {
      deep: true,
      handler () {
        this.$set(this, 'editing', false)
        this.$emit('input', this.planet)
      }
    }
  },
  mounted () {
    this.$set(this, 'planet', JSON.parse(JSON.stringify(this.value)))
  }
}
</script>
