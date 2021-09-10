import request from '@/utils/request'

export function login(data) {
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

export function user(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}

export function getrole() {
  return request({
    url: '/api/menu/GetAuthorize',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/logOut',
    method: 'post'
  })
}

export function dataAuthority(id) {
  const params = {
    id
  }
  return request({
    url: '/api/dataAuthority',
    method: 'get',
    params
  })
}

export function DataAuthorityAllotting(data) {
  return request({
    url: '/api/dataAuthority',
    method: 'post',
    data
  })
}
