import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import filter from './filter'
import '@/icons'
// 引入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
// 引入路由守卫
import '@/permission'
import TablePage from '@/components/Tablepage/index'

import XChart from '@/components/XChart.vue'

Vue.component('TablePage', TablePage)
Vue.component('XChart', XChart)
Vue.use(ElementUI, { size: 'small' })

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
