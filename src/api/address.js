import request from '@/utils/request.js'

export function getList() {
  return request({
    url: `/address/getAddress`,
    method: 'get'
  })
}

export function getListById(id) {
  return request({
    url: `/address/getAddressById?_id=${id}`,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/address/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/address/edit',
    method: 'post',
    data
  })
}
export function deleteById(id) {
  return request({
    url: `/address/remove?_id=${id}`,
    method: 'delete'
  })
}
