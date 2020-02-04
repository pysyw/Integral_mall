import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vant from 'vant'
import { Lazyload } from 'vant';
import 'lib-flexible'
import '@/icons/index.js'
import '@/permission'
import 'vant/lib/index.css';
import '@/style/index.scss'
import '@/style/reset.scss'
Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(Lazyload)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
