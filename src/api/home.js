import request from '@/utils/request.js'

export function getData(params) {
  return request({
    url: '/home/getData',
    method: 'get',
    params
  })
}

export function getCode() {
  return request({
    url: '/home/code',
    method: 'get'
  })
}
