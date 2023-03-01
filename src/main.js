import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'boxicons'
import router from '../src/router/index'
import store from './store'
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
