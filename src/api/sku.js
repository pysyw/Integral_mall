import request from '@/utils/request.js'
// 获取商品的sku
export function getGoodsSuk(id) {
  return request({
    url: `/sku/get?goodsId=${id}`,
    method: 'get'
  })
}
