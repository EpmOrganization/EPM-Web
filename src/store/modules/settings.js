import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  logotitle: true
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_TITLE: (state, data) => {
    // eslint-disable-next-line no-prototype-builtins
    state['logotitle'] = data
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeTitle({ commit }, state) {
    commit('CHANGE_TITLE', state)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
