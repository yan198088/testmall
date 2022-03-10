import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
//这个是可以让两个组件像父子组件一样传值的，
//使用this.$bus.$emit() 和 this.$bus.$on接收
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
