import request from '@/utils/request'

export function getAuthorityDept() {
  return request({
    url: '/api/DataAuthority/GetAuthorityDept',
    method: 'get'
  })
}
