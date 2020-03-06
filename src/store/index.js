import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getShoppingCar, setShoppingCar, removeShoppingCar, setToken, getToken, removeToken, getConsumerId, setConsumerId, removeConsumerId } from '@/utils/auth.js'
import { login } from '@/api/user'
export default new Vuex.Store({
  state: {
    // 用户id
    consumerId: getConsumerId() ? getConsumerId() : '',
    userInfo: '',
    token: getToken() ? getToken() : '',
    shoppingCar: getShoppingCar() ? JSON.parse(getShoppingCar()) : [],
    addressId: '5e5339764bd19336c484f175'
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
    },
    ADD_SHOP_CAR(state, data) {
      state.shoppingCar = data
      setShoppingCar(state.shoppingCar)
    },
    REMOVE_SHOP_CAR(state, data) {
      const index = state.shoppingCar.indexOf(data)
      state.shoppingCar.splice(index, 1)
      setShoppingCar(state.shoppingCar)
    },
    SET_USERId(state, data) {
      state.consumerId = data
    },
    SET_USERINFO(state, data) {
      state.userInfo = data
    },
    SET_TOKEN(state, data) {
      state.token = data
    }
  },
  actions: {
    setShopCar(context, state) {
      context.commit('SET_SHOP_CAR', state)
    },
    handleLogin(context, data) {
      const phoneNumber = data.phoneNumber.trim()
      const password = data.password.trim()
      return new Promise((resolve, reject) => {
        login({ phoneNumber, password }).then(res => {
          const result = res.data
          if (res.code === 200) {
            context.commit('SET_USERId', result.data._id)
            setToken(result.token)
            setConsumerId(result.data._id)
            context.commit('SET_USERINFO', result.data)
            context.commit('SET_TOKEN', result.token)
            context.commit('ADD_SHOP_CAR', result.shoppingCar)
            resolve(result)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLogout(context) {
      return new Promise(resolve => {
        context.commit('SET_USERId', '')
        context.commit('SET_TOKEN', '')
        removeToken()
        removeConsumerId()
        context.commit('SET_USERINFO', '')
        removeShoppingCar()
        resolve()
      })
    },
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  },
  modules: {
  }
})
