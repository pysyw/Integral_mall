import request from '@/utils/request.js'

export function getGoodsDetail(id) {
  return request({
    url: `/goods/getGoodsDetail/${id}`,
    method: 'get'
  })
}
