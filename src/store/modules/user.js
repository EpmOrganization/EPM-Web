// 引入api下的user
import { login, userinfo } from '@/api/user'
// 引入身份认证，操作token
import { setToken, getToken } from '@/utils/authentication'
import sessionStorage from '@/utils/sessionStorage'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userinfo: sessionStorage.get('userinfo') || {}
  }
}

const state = getDefaultState()
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

// 定义方法
const actions = {
  // 方法的第一个参数必须要是commit
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      // 这里的login是调用api下user里面的login方法
      login(userInfo).then(response => {
        console.log('response1:' + response)
        console.log('response2:' + response.count)
        console.log('response:' + response.data.sign)
        // const { data } = response
        // const newtoken = encodeURI(JSON.stringify(response.data))
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
