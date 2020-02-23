import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getShoppingCar, setShoppingCar } from '@/utils/auth.js'
export default new Vuex.Store({
  state: {
    // 用户id
    consumerId: '5e1821fd2309d51284df6dfe',
    shoppingCar: getShoppingCar() ? JSON.parse(getShoppingCar()) : []
  },
  mutations: {
    SET_SHOP_CAR(state, data) {
      // 判断是否已经加入过购物车中
      if (state.shoppingCar.includes(data)) {
        return
      } else {
        state.shoppingCar.push(data)
        setShoppingCar(state.shoppingCar)
      }
    }
  },
  actions: {
    setShopCar(context, state) {
      context.commit('SET_SHOP_CAR', state)
    }
  },
  modules: {
  }
})
