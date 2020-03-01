import request from '@/utils/request.js'

export function login(data) {
  return request({
    url: '/consumer/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/consumer/register',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: `/consumer/getInfo?_id=${id}`,
    method: 'get'
  })
}
