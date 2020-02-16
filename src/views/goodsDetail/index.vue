<template>
  <div class="page">
    <nav-bar title="" @onClickLeft="goback" />
    <div class="goodsImg">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in goodsSwipe" :key="index">
          <img :src="item" style="width:100%;height:100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="container">
      <p class="goodsName">{{ pageData.goodsName }}</p>
      <p class="desc">{{ pageData.goodsDetail }}}</p>
      <div class="goodsInfoWrap">
        <div v-if="pageData.isPriceSpike === 1" class="price">
          <span class="nowPrice">￥{{ pageData.priceSpike }}</span>
          <span class="oldPrice">￥{{ pageData.integral }}</span>
        </div>
        <div v-else class="price">
          <span class="nowPrice">￥{{ pageData.integral }}</span>
        </div>
        <div class="kucun">
          库存<span>{{ pageData.quantity }}</span>件
        </div>
      </div>
      <van-row class="mg-tp-30">
        <van-col span="6">
          <div class="flex-column-center">
            <svg-icon icon-class="test" />
            销量{{ pageData.hasSold }}
          </div>
        </van-col>
        <van-col span="6">
          <div class="flex-column-center">
            <svg-icon icon-class="test" />
            {{ pageData.expressWay }}快递
          </div>
        </van-col>
        <van-col span="6">
          <div class="flex-column-center">
            <svg-icon icon-class="test" />
            快递费{{ pageData.expressCost }}元
          </div>
        </van-col>
        <van-col span="6">
          <div class="flex-column-center">
            <svg-icon icon-class="test" />
            72小时内发货
          </div>
        </van-col>
      </van-row>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
      <van-goods-action-button type="warning" text="加入购物车" @click="handleBuy" />
      <van-goods-action-button type="danger" text="立即购买" @click="handleBuy" />
    </van-goods-action>
    <div class="detailPicWrap">
      <div v-for="(item, index) in imgArr" :key="index" class="imgWrap">
        <img :src="item" class="img-responsive">
      </div>
    </div>
    <my-sku ref="sku" />
  </div>
</template>
<script>
import mySku from '@/components/sku/index.vue'
import NavBar from '@/components/navBar/index.vue'
import { getGoodsDetail } from '@/api/goods.js'
export default {
  name: 'GoodsDetail',
  components: {
    NavBar,
    mySku
  },
  data() {
    return {
      imgArr: [],
      goodsSwipe: [],
      pageData: {},
      showSku: false
    }
  },
  computed: {
    _id() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    getData() {
      getGoodsDetail(this._id).then(res => {
        const data = res.data
        this.pageData = data
        this.pageData.expressWay = this.pageData.expressWay.split(',').join('/')
        this.imgArr = this.pageData.detailPic.split(',')
        this.goodsSwipe = this.pageData.goodsSwipe.split(',')
      })
    },
    handleBuy() {
      this.$refs['sku'].showSuk()
      this.showSku = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
