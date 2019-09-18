import Vue from 'vue'
import Router from 'vue-router'
import Calc from './views/Calc.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'calc',
      component: Calc
    }
  ]
})
