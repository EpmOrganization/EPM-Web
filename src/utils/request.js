/*
封装HTTP请求
*/
import axios from 'axios'
// MessageBox
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken, setToken } from '@/utils/auth'
import router from '@/router'
// import domMessage from './messageOnce'
// create an axios instance

// eslint-disable-next-line new-cap
// const messageOnce = new domMessage()

const service = axios.create({
  baseURL: '', // url = base url + request url // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    switch (config.urlType) {
      case 'login':
        config.url = window.g.Base_Login_URL + config.url
        break
      default:
        config.url = window.g.Base_Api_URL + config.url
    }
    // do something before request is sent
    config.headers['Access-Control-Allow-Origin'] = '*'
    // console.log('store.getters.token:' + store.getters.token)
    // if (store.getters.token) {
    //   config.headers['Authorization'] = `Bearer ${getToken()}`
    // }

    return config
  },
  error => {
    // do something with request error

    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */

  /*
  后端正确返回，在根据code进行判断
  */
  response => {
    const res = response.data
    if (Object.prototype.toString.call(res) === '[object Object]') {
      if (res.code === 100) {
        store.dispatch({
          type: 'user/logout'
        }).then(res => {
          router.push({ path: '/login' })
          return false
        })
      } if (res.code !== 1 && res.code !== 100) {
        Message({
          message: res.msg || '接口请求错误',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      } else {
        return res
      }
    } else {
      return response
    }
  },

  /*
  后端处理失败返回
  */
  error => {
    const { status } = error.response
    if (status === 409 || status === 410) {
      store.state.isLogin = false
      //   setToken('')
      //   messageOnce.error({
      //     message: data,
      //     type: 'error',
      //     duration: 5 * 1000
      //   })
      router.push({ path: '/login' })
      return false
    } else if (status === 401) {
      store.state.isLogin = false
      //   setToken('')
      //   messageOnce.error({
      //     message: '登录超时，请重新登录',
      //     type: 'error',
      //     duration: 5 * 1000
      //   })
      router.push({ path: '/login' })
      // location.reload()
      return false
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
