<template>
  <div>
    <div class="container">
      <nav-bar
        font-size="16px"
        title=""
        font-color="#fff"
        background-color="transparent"
        right-text="注册"
        @onClickRight="goto('/register')"
      />
      <div class="loginWrap">
        <div class="logoWrap">
          <div style="fontSize:35px;fontWeight:500;color:#fff">LOGIN</div>
          <div class="formWrap flex-column-center">
            <van-form @submit="onSubmit">
              <van-field
                v-model="phoneNumber"
                name="phoneNumber"
                label="手机号"
                placeholder="请输入手机号"
                :rules="[{ validator,required: true, message: '请填写正确的手机格式' }]"
              />
              <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="请输入密码"
                :rules="[{ required: true,message:'请填写密码' }]"
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
import navBar from '@/components/navBar'
import { getCode } from '@/api/home'
import { Toast } from 'vant'
export default {
  name: 'Login',
  components: {
    navBar
  },
  data() {
    return {
      phoneNumber: '',
      password: '',
      code: ''
    }
  },
  mounted() {
    getCode().then(res => {
      this.code = res.data
    })
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
    },
    goto(url) {
      this.$router.push(url)
    },
    validator(val) {
      return /^1[3456789]\d{9}$/.test(val)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
