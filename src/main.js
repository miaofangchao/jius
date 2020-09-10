import Vue from 'vue'
import App from './App'
import router from './router'
import vueTap from 'v-tap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Spinner } from 'mint-ui'
import store from './store/store'
Vue.component(Spinner.name, Spinner);
Vue.use(VueAxios,axios)
Vue.use(vueTap)

Vue.config.productionTip = false

new Vue({
  data:{
    sharedStore:store
  },
  router,
  render: h => h(App)
}).$mount('#app')