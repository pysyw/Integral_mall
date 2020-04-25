<template>
  <div class="container">
    <div class="topWrap">
      <div class="userBar">
        <div class="avatar">
          <van-image round width="2rem" height="2rem" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" />
        </div>
        <div v-if="token" class="info">
          <div class="userName">
            <span>{{ userData. name }}</span>
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
            <van-cell title="修改登录密码" is-link @click="showOverLay('pwd')" />
            <van-cell title="常见问题" is-link @click="showOverLay('question')" />
            <van-cell title="关于我们" is-link @click="showOverLay('aboutUs')" />
          </van-cell-group>
        </div>
      </div>
      <van-button v-if="userData" round @click="logout">退出登录</van-button>
      <van-button v-else round style="width:100%" @click="login">登录</van-button>
    </div>
    <van-overlay :show="show" z-index="999" @click.stop="show = false">
      <div class="wrapper">
        <div v-if="tag === 'pwd'" class="formWrap" @click.stop>
          <div class="content">
            <div class="title">修改密码</div>
            <van-form @submit="changePwd">
              <van-field
                v-model="password"
                style="padding:20px"
                placeholder="请输入要更改的密码"
                required
                type="password"
                label="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
              <div class="btnWrap">
                <van-button type="info" style="width:100%" round >提交</van-button>
              </div>
            </van-form>
          </div>

        </div>
        <div v-else-if="tag=== 'question'" class="contentWrap">
          <div class="title">常见问题</div>
          <div class="text">
            如果需要有任何疑问，请找商城管理员咨询咨询
          </div>
        </div>
        <div v-else-if="tag=== 'aboutUs'" class="contentWrap">
          <div class="title">关于我们</div>
          <div class="text">
            积分商城持着客户至上的原则来服务
          </div>
        </div>
        <van-icon class="close" color="#fff" size="30px" name="cross" />
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { getInfo, editPwd } from '@/api/user'
import { Dialog, Toast } from 'vant'
import store from '@/store'
export default {
  name: 'My',
  data() {
    return {
      tag: '',
      userData: '',
      password: '',
      show: false,
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
    showOverLay(option) {
      this.tag = option
      this.show = true
    },
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
    },
    changePwd() {
      editPwd({ password: this.password }).then(res => {
        if (res.code === 200) {
          this.show = false
          this.tag = ''
          this.password = ''
          Toast.success({
            message: res.message
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
::v-deep .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
    .formWrap{
      width: 80%;
      .content{
        padding:20px 0 30px 0;
        .title{
          font-size:32px;
          padding: 20px;
           background: #fff;
          color: #409EFF
        }
        .van-field__label{
          width: 90px
        }
      }
      .btnWrap {
        margin-top:60px
      }
    }
    .contentWrap{
      background:#fff;
      width:80%;
      .title{
          font-size:32px;
          padding: 20px;
          color: #409EFF
      }
      .text{
        height: 300px;
        font-size: 32px;
        padding: 20px;
      }
    }
    .close{
      border:1px solid #fff;
      margin-top:30px;
      border-radius: 50%
    }
  }
</style>
