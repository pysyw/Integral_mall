<template>
  <div class="home tabHeight">
    <div class="swipeWrap">
      <van-swipe height="200" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" style="width:100%;height:100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="utilBar">
      <van-row>
        <van-col span="6">
          <div class="flex-column-center">
            <svg-icon icon-class="test" />
            <p>商品分类</p>
          </div>
        </van-col>
        <van-col span="6">
          <div class="flex-column-center">
            <svg-icon icon-class="test" />
            <p>今日特价</p>
          </div>
        </van-col>
        <van-col span="6">
          <div class="flex-column-center">
            <svg-icon icon-class="test" />
            <p>领卷中心</p>
          </div>
        </van-col>
        <van-col span="6">
          <div class="flex-column-center">
            <svg-icon icon-class="test" />
            <p>充值</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="categoryWrap">
      <van-row gutter="20">
        <van-col span="12">
          <van-row>
            <van-col span="12">
              <div class="categoryItem">
                <div class="categoryLogo">
                  <img src="../../assets/img/1.jpg">
                </div>
              </div>
            </van-col>
            <van-col span="12">
              <div class="introWrap ">
                <span>数码通讯</span>
                <van-button round size="small">点击进入</van-button>
              </div>
            </van-col>
          </van-row>
        </van-col>
        <van-col span="12">
          <van-row>
            <van-col span="12">
              <div class="categoryItem">
                <div class="categoryLogo">
                  <img src="../../assets/img/1.jpg">
                </div>
              </div>
            </van-col>
            <van-col span="12">
              <div class="introWrap ">
                <span>数码通讯</span>
                <van-button round size="small">点击进入</van-button>
              </div>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="mg-tp-30" gutter="20">
        <van-col span="12">
          <van-row>
            <van-col span="12">
              <div class="categoryItem">
                <div class="categoryLogo">
                  <img src="../../assets/img/1.jpg">
                </div>
              </div>
            </van-col>
            <van-col span="12">
              <div class="introWrap ">
                <span>数码通讯</span>
                <van-button round size="small">点击进入</van-button>
              </div>
            </van-col>
          </van-row>
        </van-col>
        <van-col span="12">
          <van-row>
            <van-col span="12">
              <div class="categoryItem">
                <div class="categoryLogo">
                  <img src="../../assets/img/1.jpg">
                </div>
              </div>
            </van-col>
            <van-col span="12">
              <div class="introWrap ">
                <span>数码通讯</span>
                <van-button round size="small">点击进入</van-button>
              </div>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <div class="miaosha">
      <van-row class="flex-center">
        <van-col span="12">
          <div class="miaosha-left flex">
            <svg-icon icon-class="test" />
            <span style="margin-right:5px">秒杀</span>
            <count-down :end-time="date" style="line-height:1.5" />
          </div>
        </van-col>
        <van-col span="12">
          <div class="miaoshaMore">
            <div class="round-btn">
              更多秒杀好货 >
            </div>
          </div>
        </van-col>
      </van-row>
      <div class="miaoshaItem">
        <van-row gutter="10">
          <van-col span="8">
            <div class="flex-column-center">
              <img src="../../assets/img/2.jpg" class="img-responsive">
              <p class="nowPrice">999</p>
              <p class="oldPrice">1999</p>
            </div>
          </van-col>
          <van-col span="8">
            <div class="flex-column-center">
              <img src="../../assets/img/2.jpg" class="img-responsive">
              <p class="nowPrice">999</p>
              <p class="oldPrice">1999</p>
            </div>
          </van-col>
          <van-col span="8">
            <div class="flex-column-center">
              <img src="../../assets/img/2.jpg" class="img-responsive">
              <p class="nowPrice">999</p>
              <p class="oldPrice">1999</p>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="advertise">
      <img src="../../assets/img/4.jpg" class="img-responsive">
    </div>
    <div class="goodsWrap">
      <van-row>
        <van-col span="6">
          <div class="flex-column-center">
            <img src="../../assets/img/2.jpg" class="img-responsive">
            <p class="goodsName">口红</p>
            <span>￥108.2</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="flex-column-center">
            <img src="../../assets/img/2.jpg" class="img-responsive">
            <p class="goodsName">口红</p>
            <span>￥108.2</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="flex-column-center">
            <img src="../../assets/img/2.jpg" class="img-responsive">
            <p class="goodsName">口红</p>
            <span>￥108.2</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="flex-column-center">
            <img src="../../assets/img/2.jpg" class="img-responsive">
            <p class="goodsName">口红</p>
            <span>￥108.2</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="flex-column-center">
            <img src="../../assets/img/2.jpg" class="img-responsive">
            <p class="goodsName">口红</p>
            <span>￥108.2</span>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CountDown from '@/components/countdown'
export default {
  name: 'Home',
  components: {
    CountDown
  },
  data() {
    return {
      date: 0,
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  mounted() {
    this.date = new Date().setHours(24, 0, 0, 0)
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
