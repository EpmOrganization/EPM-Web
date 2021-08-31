import request from '@/utils/request'

export function role_getlist(params) {
  return request({
    url: '/api/role/GetList',
    method: 'get',
    params
  })
}
export function role_tree(params) {
  return request({
    url: '/api/role',
    method: 'get',
    params
  })
}

export function role(data) {
  return request({
    url: '/api/role',
    method: 'post',
    data
  })
}
export function role_edit(data) {
  return request({
    url: '/api/role',
    method: 'put',
    data
  })
}

export function role_del(id) {
  const params = { id }
  return request({
    url: '/api/role',
    method: 'delete',
    params
  })
}

export function role_detail(id) {
  const params = {}
  params.id = id
  return request({
    url: '/api/RoleAuthorityDetail',
    method: 'get',
    params
  })
}
