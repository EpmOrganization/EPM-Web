import request from '@/utils/request'

export function getlist(data) {
  return request({
    url: '/api/workitem/getlist',
    method: 'post',
    data
  })
}

export function workItem_add(data) {
  return request({
    url: '/api/workitem',
    method: 'post',
    data
  })
}
export function workItem_edit(data) {
  return request({
    url: '/api/workitem',
    method: 'put',
    data
  })
}

