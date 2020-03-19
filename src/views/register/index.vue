<template>
  <div>
    <div class="container">
      <nav-bar
        font-size="16px"
        left-text="返回"
        title=""
        font-color="#fff"
        background-color="transparent"
      />
      <div class="logoWrap">
        <div style="fontSize:35px;fontWeight:500;color:#fff">注册账号</div>
        <div class="formWrap flex-column-center">
          <van-form @submit="onSubmit">
            <van-field
              v-model="name"
              name="name"
              label="用户名："
              placeholder="请输入用户名"
              :rules="[{ required: true, message: '请填用户名' }]"
            />
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
</template>
<script>
import navBar from '@/components/navBar'
import { getCode } from '@/api/home'
import { register } from '@/api/user'
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
      code: '',
      name
    }
  },
  mounted() {
    getCode().then(res => {
      this.code = res.data
    })
  },
  methods: {
    onSubmit(loginForm) {
      register(loginForm).then(res => {
        console.log(res)
        if (res.code === 200 & res.msg === '注册成功') {
          Toast({
            type: 'success',
            message: res.msg,
            onClose: () => {
              this.$router.replace('/login')
            }
          })
        } else {
          Toast({
            type: 'fail',
            message: res.msg
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
