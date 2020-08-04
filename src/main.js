import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import './assets/css/style.css'
import VModal from 'vue-js-modal'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(VModal)

Vue.filter('date', (value) => {
    if(!value) {
        return ''
    }

    return moment(value).format('llll')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
