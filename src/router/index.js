import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  }, {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      showTab: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/goodsDetail/:id',
    name: 'goodsDetail',
    component: () => import('@/views/goodsDetail/index.vue')
  },
  {
    path: '/goodsCategory/:categoryId',
    name: 'goodsCategory',
    component: () => import('@/views/goodsCategory/index.vue')
  },
  {
    path: '/shoppingCar',
    name: 'shoppingCar',
    component: () => import('@/views/shoppingCar/index.vue'),
    meta: {
      showTab: true
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my/index.vue'),
    meta: {
      showTab: true
    }
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('@/views/addressList/index.vue'),
    meta: {
      showTab: false
    }
  },
  {
    path: '/editAddress/:addressId?',
    name: 'editAddress',
    component: () => import('@/views/editAddress/index.vue'),
    meta: {
      showTab: false
    }
  },
  {
    path: '/specialOffer',
    name: 'specialOffer',
    component: () => import('@/views/specialOffer/index.vue')
  },
  {
    path: '/orderList/:status?',
    name: 'orderList',
    component: () => import('@/views/orderList/index.vue')
  },
  {
    path: '/order/:orderId/:selectedNum',
    name: 'order',
    component: () => import('@/views/order/index.vue')
  },
  {
    path: '/order/shopCar',
    name: 'order',
    component: () => import('@/views/order/shopCarOrder.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})
// 需要左方向动画的路由用this.$router.to('****')
VueRouter.prototype.togo = function(path) {
  this.isleft = true
  this.isright = false
  this.push(path)
}
// 需要右方向动画的路由用this.$router.goRight('****')
VueRouter.prototype.goRight = function(path) {
  this.isright = true
  this.isleft = false
  this.push(path)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
VueRouter.prototype.goBack = function() {
  this.isright = true
  this.isleft = false
  this.go(-1)
}
// 点击浏览器返回按钮执行，此时不需要路由回退
VueRouter.prototype.togoback = function() {
  this.isright = true
  this.isleft = false
}
export default router
