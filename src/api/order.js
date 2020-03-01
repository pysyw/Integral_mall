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
// 商品详情里下单
export function order(data) {
  return request({
    url: '/order/handleOrder',
    method: 'post',
    data
  })
}

// 购物车里下单
export function orderCar(data) {
  return request({
    url: '/order/handleCarOrder',
    method: 'post',
    data
  })
}

// 获取顾客订单列表
export function getOrderLists(params) {
  return request({
    url: '/order/getOrderList',
    method: 'get',
    params
  })
}
