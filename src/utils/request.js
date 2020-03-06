import axios from 'axios'
import { Dialog, Toast } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router/index'

// axios.defaults.withCredentials = true

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.state.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.Authorization = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Toast({
        message: res.message || 'Error',
        type: 'fail',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 500 || res.code === 401) {
        // to re-login
        Dialog.confirm({
          title: '通知',
          message: res.message || '请先登录'
        }).then(() => {
          store.dispatch('resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error.response) {
      console.log(router)
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          Dialog.confirm({
            title: '通知',
            message: '账号过期或未登录,请先登录'
          }).then(() => {
            store.dispatch('resetToken').then(() => {
              router.replace({
                path: '/login'
              })
            })
          })
      }
    }
    return Promise.reject(error)
  }
)

export default service
