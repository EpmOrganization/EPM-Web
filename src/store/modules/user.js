// 引入api下的user
import { login, userinfo, user, getrole, logout } from '@/api/user'
// 引入身份认证，操作token
import { setToken, getToken, removeToken } from '@/utils/authentication'
import sessionStorage from '@/utils/sessionStorage'
import { resetRouter } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    funlist: sessionStorage.get('funlist') || [],
    userinfo: sessionStorage.get('userinfo') || {},
    role: sessionStorage.get('role') || []
  }
}

const state = getDefaultState()
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo
  },
  SET_FUN: (state, funlist) => {
    state.funlist = funlist
  }
}

// 定义方法
const actions = {
  // 方法的第一个参数必须要是commit
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      // 这里的login是调用api下user里面的login方法
      login(userInfo).then(response => {
        console.log('newtoken:' + response.data)
        commit('SET_TOKEN', response.data)
        setToken(response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  userinfo({ commit }) {
    return new Promise((resolve, reject) => {
      userinfo().then(response => {
        const { data } = response
        commit('SET_USERINFO', data)
        sessionStorage.set('userinfo', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  user({ commit }, data) {
    return new Promise((resolve, reject) => {
      user(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getrole({ commit }) {
    return new Promise((resolve, reject) => {
      getrole().then(response => {
        const { data } = response
        sessionStorage.set('role', data)
        commit('SET_ROLE', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        sessionStorage.clear()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  setfun({ commit }, data) {
    sessionStorage.set('funlist', data || [])
    commit('SET_FUN', data || [])
  },
  // 计算左侧显示的菜单
  rolevoid(store, path) {
    const newrouter = JSON.parse(JSON.stringify(router.options.routes))
    newrouter.map(v => {
      if (v.children && v.children.length) {
        v.children.map(s => {
          s.path = v.path + '/' + s.path
        })
      }
    })
    const rolelist = store.state.role.filter(v => {
      if (v.type && v.type === 1) {
        return v
      }
    })
    const newss = rolelist.map(v => {
      return v.value
    })

    let state = false
    newrouter.map(item => {
      if (item.path === path.path) {
        if (newss.includes(path.path)) {
          state = true
        } else if (item.hidden) {
          state = true
        } else {
          state = false
        }
      } else {
        if (item.children && item.children.length) {
          item.children.map(v => {
            if (v.path === path.path) {
              if (newss.includes(path.path)) {
                state = true
              } else if (v.hidden) {
                state = true
              } else {
                state = false
              }
            }
          })
        }
      }
    })
    return state
  }
}

// 导出
export default {
  // ?使其成为带命名空间的模块，保证在变量名一样的时候，添加一个父级名拼接
  namespaced: true,
  state,
  mutations,
  actions
}
