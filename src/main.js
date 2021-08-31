import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/icons'
// 引入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
// 引入路由守卫
import '@/permission'
import TablePage from '@/components/Tablepage/index'

Vue.component('TablePage', TablePage)
Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
