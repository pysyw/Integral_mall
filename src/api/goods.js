import request from '@/utils/request.js'

export function getGoodsDetail(id) {
  return request({
    url: `/goods/getGoodsDetail/${id}`,
    method: 'get'
  })
}

// 根据分类Id获取商品
export function getGoodsByCategoryId(id) {
  return request({
    url: `/goods/getGoods?categoryId=${id}`,
    method: 'get'
  })
}
