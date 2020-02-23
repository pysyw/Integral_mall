<template>
  <div class="container">
    <div class="topWrap">
      <div class="userBar">
        <div class="avatar">
          <van-image round width="1.5rem" height="1.5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="info">
          <div class="userName">
            <span>卢本伟</span>
            <svg-icon icon-class="test" />
          </div>
          <div class="Id">
            Id:123456
          </div>
        </div>
      </div>
    </div>
    <div class="itemWrap">
      <div class="roundWrap xinxiWrap">
        <div class="orderList">
          <van-row>
            <van-col span="6" class="flex-column-center">
              <svg-icon icon-class="test" />
              <p>待付款</p>
            </van-col>
            <van-col span="6" class="flex-column-center">
              <svg-icon icon-class="test" />
              <p>待付款</p>
            </van-col>
            <van-col span="6" class="flex-column-center">
              <svg-icon icon-class="test" />
              <p>待付款</p>
            </van-col>
            <van-col span="6" class="flex-column-center">
              <svg-icon icon-class="test" />
              <p>待付款</p>
            </van-col>
          </van-row>
        </div>
        <div class="messageWrap">
          <van-row>
            <van-col span="12">
              <div class="flex-column-center">
                <span>50.00</span>
                <p>余额（元）</p>
              </div>
            </van-col>
            <van-col span="12">
              <div class="flex-column-center">
                <span>50.00</span>
                <p>余额（元）</p>
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
      <van-button round>退出登录</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'My'
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
