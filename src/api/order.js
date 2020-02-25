import request from '@/utils/request.js'
// 新增订单
export function addOrder(data) {
  return request({
    url: '/order/add',
    method: 'post',
    data
  })
}
// 根据skuId和客户Id查找订单
export function getOrderBySkuId(params) {
  return request({
    url: '/order/getOrderBySkuId',
    method: 'get',
    params
  })
}
// 下单
export function order(data) {
  return request({
    url: '/order/handleOrder',
    method: 'post',
    data
  })
}
