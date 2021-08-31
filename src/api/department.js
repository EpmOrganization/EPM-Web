import request from '@/utils/request'

export function department_tree(id) {
  const data = {
    divisionID: id
  }
  return request({
    url: '/api/department/GetList',
    method: 'post',
    data
  })
}

export function OrganizationalStructure(params) {
  return request({
    url: '/api/department/getlist',
    method: 'get',
    params
  })
}

export function department_add(data) {
  return request({
    url: '/api/department',
    method: 'post',
    data
  })
}

export function department_del(params) {
  return request({
    url: '/api/department',
    method: 'delete',
    params
  })
}

export function department_edit(data) {
  return request({
    url: '/api/department',
    method: 'put',
    data
  })
}

export function department_adddep(data) {
  return request({
    url: '/api/usergroup',
    method: 'post',
    data
  })
}

export function department_depedit(data) {
  return request({
    url: '/api/usergroup',
    method: 'put',
    data
  })
}

export function department_depdel(id) {
  const params = {
    id
  }
  return request({
    url: '/api/usergroup',
    method: 'delete',
    params
  })
}

export function department_GetList() {
  const data = {
    isPaging: false
  }
  return request({
    url: '/api/OrganizationalStructure/GetList',
    method: 'post',
    data
  })
}
