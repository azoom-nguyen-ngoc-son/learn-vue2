import  DetailBoard  from "../pages/DetailBoard/index.vue";
import HomePage from '../pages/HomePage/index.vue'
import VueRouter from "vue-router"
import Vue from "vue"
 const routes = [
    {path: '/', component: HomePage},
    { path: '/board', component: DetailBoard },
  ]
Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: "history"
})

export default router