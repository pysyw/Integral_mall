import Cookies from 'js-cookie'

const TokenKey = 'token'
const ShoppingCarKey = 'shoppingCar'
const ConsumerIdKey = 'consumerId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getConsumerId() {
  return Cookies.get(ConsumerIdKey)
}

export function setConsumerId(id) {
  return Cookies.set(ConsumerIdKey, id)
}

export function removeConsumerId() {
  return Cookies.remove(ConsumerIdKey)
}

// 购物车cookies
export function getShoppingCar() {
  return Cookies.get(ShoppingCarKey)
}
export function setShoppingCar(ShoppingCar) {
  return Cookies.set(ShoppingCarKey, ShoppingCar)
}
export function removeShoppingCar() {
  return Cookies.remove(ShoppingCarKey)
}
