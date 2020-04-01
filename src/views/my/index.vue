<template>
  <div class="container">
    <div class="topWrap">
      <div class="userBar">
        <div class="avatar">
          <van-image round width="2rem" height="2rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div v-if="token" class="info">
          <div class="userName">
            <span>{{ userData. name }}</span>
            <svg-icon icon-class="test" />
          </div>
          <div class="Id">
            Id:{{ userData._id }}
          </div>
        </div>
        <div v-else class="info">
          <div class="userName">
            <van-cell title="请登录" is-link to="/login" />
          </div>
        </div>
      </div>
    </div>
    <div class="itemWrap">
      <div class="roundWrap xinxiWrap">
        <div class="orderList">
          <van-row>
            <van-col
              v-for="item in orderList"
              :key="item.id"
              span="8"
              class="flex-column-center"
              @click="$router.push(`/orderList/${item.status}`)"
            >
              <svg-icon :icon-class="item.icon" />
              <p>{{ item.name }}</p>
            </van-col>
          </van-row>
        </div>
        <div class="messageWrap">
          <van-row>
            <van-col span="12">
              <div class="flex-column-center">
                <span>{{ userData.totalIntegral }}</span>
                <p>总共积分</p>
              </div>
            </van-col>
            <van-col span="12">
              <div class="flex-column-center">
                <span>{{ userData.nowIntegral }}</span>
                <p>剩余积分</p>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="roundWrap settingWrap mg-tp-30">
        <div>
          <van-cell-group>
            <van-cell title="收获地址" is-link to="/address" />
            <van-cell title="修改登录密码" is-link />
            <van-cell title="常见问题" is-link />
            <van-cell title="关于我们" is-link />
          </van-cell-group>
        </div>
      </div>
      <van-button v-if="userData" round @click="logout">退出登录</van-button>
      <van-button v-else round style="width:100%" @click="login">登录</van-button>
    </div>
  </div>
</template>
<script>
import { getInfo } from '@/api/user'
import { Dialog } from 'vant'
import store from '@/store'
export default {
  name: 'My',
  data() {
    return {
      userData: '',
      orderList: [
        {
          name: '未付订单',
          status: 0,
          icon: 'nopay',
          id: 0
        },
        {
          name: '已付订单',
          status: 1,
          icon: 'paied',
          id: 1
        },
        {
          name: '所有订单',
          status: '',
          icon: 'order',
          id: 2
        }
      ],
      status: 0 // 0:未登录， 1：以登录
    }
  },
  computed: {
    token() {
      return store.state.token
    },
    userInfo() {
      return store.state.userInfo
    },
    consumerId() {
      return store.state.consumerId
    }
  },
  mounted() {
    if (this.token) {
      this.getConsumerInfo()
    }
  },
  methods: {
    getConsumerInfo() {
      getInfo(this.consumerId).then(res => {
        this.userData = res.data
      })
    },
    logout() {
      Dialog.confirm({
        title: '提示',
        message: '您真的要退出登录嘛'
      }).then(() => {
        this.userData = ''
        store.dispatch('handleLogout')
      }).catch(() => {
        return
      })
    },
    login() {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
