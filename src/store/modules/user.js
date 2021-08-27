import { login } from '@/api/user'

// 定义方法
const actions = {
  login(userInfo) {
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
  actions
}
