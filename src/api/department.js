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

// 新增部门
export function department_add(data) {
  return request({
    url: '/api/department',
    method: 'post',
    data
  })
}

// 删除
export function department_del(id) {
  const params = {
    id
  }
  return request({
    url: '/api/department',
    method: 'delete',
    params
  })
}

// 修改
export function department_edit(data) {
  return request({
    url: '/api/department',
    method: 'put',
    data
  })
}

export function department_GetList() {
  const data = {
    isPaging: false
  }
  return request({
    url: '/api/department/GetList',
    method: 'post',
    data
  })
}

export function getdept() {
  return request({
    url: '/api/department/getdept',
    method: 'get'
  })
}
