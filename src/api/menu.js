import request from '@/utils/request'

export function menu_tree() {
  return request({
    url: '/api/menu/getlist',
    method: 'get'
  })
}

export function menu_add(data) {
  return request({
    url: '/api/menu',
    method: 'post',
    data
  })
}
export function menu_edit(data) {
  return request({
    url: '/api/menu',
    method: 'put',
    data
  })
}
export function menu_del(params) {
  return request({
    url: '/api/menu',
    method: 'delete',
    params
  })
}
