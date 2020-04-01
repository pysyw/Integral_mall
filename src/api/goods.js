import request from '@/utils/request.js'

export function getGoodsDetail(id) {
  return request({
    url: `/goods/getGoodsDetail?id=${id}`,
    method: 'get'
  })
}

// 根据分类Id获取商品
export function getGoodsByCategoryId(params) {
  return request({
    url: `/goods/getGoods`,
    method: 'get',
    params
  })
}

export function searchGoods(params) {
  return request({
    url: '/goods/searchGoods',
    method: 'get',
    params
  })
}
