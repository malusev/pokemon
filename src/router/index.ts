import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import PokemonDetail from '../components/PokemonDetail.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokemon-details',
    name: 'PokemonDetail',
    component: PokemonDetail,
    props: (route) => ({
      ...route.params
    })
  }
]

const router = new VueRouter({
  routes
})

export default router
