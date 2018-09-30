import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.errorHandler = function (err, vm, info) {
  console.log('Error in ' + info + ': ' + err)
}

Vue.config.productionTip = false
Vue.prototype.$apihost = 'http://localhost:3000'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
