<template>
  <div class="contaner">
    <nav-bar title="今日特价" />
    <div class="swipeWrap">
      <van-swipe height="180" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" style="width:100%;height:100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="listWrap">
      <div v-for="i in 8" :key="i" class="list van-hairline--bottom">
        <div class="imgWrap">
          <img src="../../assets/img/2.jpg" class="img-responsive">
        </div>
        <div class="intro">
          <div class="itemName">
            情侣卫衣<span class="discount">低至4折</span>
          </div>
          <div class="desc">
            情到浓时，恨不得昭告天下，青女卫衣给你的爱情添色
          </div>
          <div class="itemFooter">
            <div class="priceWrap">
              <span class="nowPrice">￥136</span>
              <span class="oldPrice">￥446</span>
            </div>
            <van-button round size="mini">去购买</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/navBar'
export default {
  name: 'SpecialOffer',
  components: {
    NavBar
  },
  data() {
    return {
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
