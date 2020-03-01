<template>
  <div>
    <div class="container">
      <div class="loginWrap">
        <div class="logoWrap">
          <van-image
            round
            width="1.8rem"
            height="1.8rem"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="formWrap flex-column-center">
            <van-form @submit="onSubmit">
              <van-field
                v-model="phoneNumber"
                name="phoneNumber"
                label="手机号"
                placeholder="请输入手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
              />
              <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
              <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                  提交
                </van-button>
              </div>
            </van-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import { Toast } from 'vant'
export default {
  name: 'Login',
  data() {
    return {
      phoneNumber: '',
      password: ''
    }
  },
  methods: {
    onSubmit(loginForm) {
      store.dispatch('handleLogin', loginForm).then(() => {
        Toast({
          type: 'success',
          message: '登录成功',
          duration: 1000,
          onClose: () => {
            this.$router.replace('/my')
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
