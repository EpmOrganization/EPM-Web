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
