import request from '@/utils/request'

export function login(data) {
  console.log('data:' + data)
  return request({
    url: '/api/login',
    method: 'post',
    data,
    urlType: 'login'
  })
}

export function userinfo() {
  return request({
    url: '/api/user/GetCurrentUser',
    method: 'get'
  })
}
