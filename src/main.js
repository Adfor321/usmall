// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './utils/alter'

import commonComponents from "./components/index"
for (let i in commonComponents) {
  Vue.component(i, commonComponents[i])
}
Vue.prototype.$imgs = 'http://localhost:3000'
import filters from "./filters"
for (let i in filters) {
  Vue.filter(i, filters[i])
}
import store from "./store/index"
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
