<template>
  <div class="home tabHeight">
    <div class="swipeWrap">
      <van-swipe height="200" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img :src="item.img" style="width:100%;height:100%">
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
        <van-col v-for="(item,index) in categoryArr" :key="index" span="12">
          <!-- <van-row>
            <van-col span="12">
              <div class="categoryItem">
                <div class="categoryLogo">
                  <img :src="item.logo">
                </div>
              </div>
            </van-col>
            <van-col span="12">
              <div class="introWrap ">
                <span>{{ item.categoryName }}</span>
                <van-button round size="small">点击进入</van-button>
              </div>
            </van-col>
          </van-row> -->
          <div class="categoryItem">
            <div class="categoryLogo">
              <img :src="item.logo">
            </div>
            <div class="introWrap ">
              <span>{{ item.categoryName }}</span>
              <van-button round size="small" @click="goto('goodsCategory',item._id)">点击进入</van-button>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div v-if="priceSpikeGoods.length !== 0" class="miaosha">
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
          <van-col v-for="(item,index) in priceSpikeGoods" :key="index" span="8">
            <div class="flex-column-center">
              <img :src="item.picture" class="img-responsive">
              <p class="nowPrice">{{ item.priceSpike }}</p>
              <p class="oldPrice">{{ item.integral }}</p>
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
        <van-col v-for="(item, index) in goods" :key="index" span="12">
          <div class="flex-column-center goodsItem" @click="goto('goodsDetail', item._id)">
            <div class="goodsPicWrap">
              <img :src="item.picture" class="img-responsive">
            </div>
            <p class="goodsName">{{ item.goodsName }}</p>
            <span>￥{{ item.integral }}</span>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CountDown from '@/components/countdown'
import { getData } from '@/api/home.js'

export default {
  name: 'Home',
  components: {
    CountDown
  },
  data() {
    return {
      date: 0,
      images: [],
      goods: [],
      priceSpikeGoods: [],
      categoryArr: []
    }
  },
  mounted() {
    this.getPageData()
    this.date = new Date().setHours(24, 0, 0, 0)
  },
  methods: {
    getPageData() {
      getData().then(res => {
        const data = res.data
        this.images = data.swipeArr
        this.goods = data.goods
        this.priceSpikeGoods = data.priceSpike
        this.categoryArr = data.category
      })
    },
    goto(url, id) {
      this.$router.push(`/${url}/${id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
