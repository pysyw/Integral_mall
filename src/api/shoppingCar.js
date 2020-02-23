import request from '@/utils/request.js'
// 获取用户的购物车列表
export function getShoppingCarList(id) {
  return request({
    url: `/shoppingCar/getAllShopCars?id=${id}`,
    method: 'get'
  })
}
// 用户添加购物车
export function addShoppingCar(data) {
  return request({
    url: '/shoppingCar/addShopCar',
    method: 'POST',
    data
  })
}
// 修改重复添加进购物车
export function editShoppingCar(data) {
  return request({
    url: '/shoppingCar/editShopCar',
    method: 'POST',
    data
  })
}
// 移除购物车
export function removeShoppingCar(_id) {
  return request({
    url: `/shoppingCar/removeShoppingCar?_id=${_id}`,
    method: 'delete'
  })
}
