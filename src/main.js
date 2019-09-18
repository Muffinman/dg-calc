import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueNumeralFilterInstaller from 'vue-numeral-filter'

Vue.config.productionTip = false

Vue.use(vueNumeralFilterInstaller)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
