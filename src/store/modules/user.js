import { login } from '@/api/user'

// 定义方法
const actions = {
  login(userInfo) {
    console.log('userInfo:' + userInfo)
    console.log('userInfo:' + userInfo.loginname)
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        resolve()
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
  actions
}
