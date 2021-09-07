// 引入处理Cookie的js API
import Cookies from 'js-cookie'

const AccessTokenKey = 'accessToken'

// 获取token
export function getToken() {
  return Cookies.get(AccessTokenKey)
}
// 设置token
export function setToken(token) {
  return Cookies.set(AccessTokenKey, token)
}
// 移除token
export function removeToken() {
  return Cookies.remove(AccessTokenKey)
}
