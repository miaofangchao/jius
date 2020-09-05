import Vue from 'vue'
import App from './App'
import router from './router'
import vueTap from 'v-tap'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
Vue.use(vueTap)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')