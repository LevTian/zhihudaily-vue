import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import fastClick from "fastclick"
import VueAwesomeSwiper from "vue-awesome-swiper"

import "./assets/styles/reset.css"
import "./assets/styles/border.css"
import "./assets/styles/iconfont.css"
import 'swiper/dist/css/swiper.css'


Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
fastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
