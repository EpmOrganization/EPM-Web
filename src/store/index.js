import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import department from './modules/department'
import getters from './getters'
import settings from './modules/settings'
import app from './modules/app'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    department,
    settings,
    app
  },
  getters
})

// 导出
export default store
