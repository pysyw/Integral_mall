<template>
  <div class="page">
    <nav-bar title="商品详情" @onClickLeft="goback" />
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
      <van-goods-action-icon icon="cart-o" text="购物车" :info="shopCarsNumber" @click="$router.push('/shoppingCar')" />
      <van-goods-action-button type="warning" text="加入购物车" @click="handleBuy" />
      <van-goods-action-button type="danger" text="立即购买" @click="handleBuy" />
    </van-goods-action>
    <div class="detailPicWrap">
      <div v-for="(item, index) in imgArr" :key="index" class="imgWrap">
        <img :src="item" class="img-responsive">
      </div>
    </div>
    <my-sku ref="sku" :goods-id="pageData._id" />
  </div>
</template>
<script>
import mySku from '@/components/sku/index.vue'
import NavBar from '@/components/navBar/index.vue'
import store from '@/store'
import { getGoodsDetail } from '@/api/goods.js'
import { getGoodsSuk } from '@/api/sku.js'
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
      showSku: false,
      sku: {
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: 0, // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        collection_id: '', // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {}
    }
  },
  computed: {
    // 商品的_id
    _id() {
      return this.$route.params.id
    },
    shopCarsNumber() {
      return store.state.shoppingCar.length
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
        console.log(data)
        this.pageData.expressWay = this.pageData.expressWay.split(',').join('/')
        this.imgArr = this.pageData.detailPic.split(',')
        this.goodsSwipe = this.pageData.goodsSwipe.split(',')
        // sku数据对接
        this.goods.title = data.goodsName
        this.goods.picture = data.picture
      })
    },
    getSku() {
      getGoodsSuk(this._id).then(res => {
        const data = res.data
        this.sku.tree = [
          {
            k: data.skuKeyName, // skuKeyName：规格类目名称
            v: [
              {
                id: data.skuValueId, // skuValueId：规格值 id
                name: data.skuValueName, // skuValueName：规格值名称
                imgUrl: data.imgUrl, // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: data.previewImgUrl // 用于预览显示的规格类目图片
              }
            ],
            k_s: 's1'// skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ]
        this.sku.list = [
          {
            id: data._id, // skuId，下单时后端需要
            price: data.goodsId.integral * 100, // 价格（单位分）
            s1: data.skuValueId, // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: data.goodsId.quantity // 当前 sku 组合对应的库存
          }
        ]
        this.sku.price = data.goodsId.integral
        this.sku.stock_num = data.goodsId.quantity // 商品总库存
        this.sku.collection_id = data._id // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        this.sku.none_sku = data.noneSku // 是否无规格商品
        this.sku.hide_stock = false // 是否隐藏剩余库存
        console.log(data.goodsId.integral)
        // this.sku = {
        //   tree: [
        //     {
        //       k: data.skuKeyName, // skuKeyName：规格类目名称
        //       v: [
        //         {
        //           id: data.skuValueId, // skuValueId：规格值 id
        //           name: data.skuValueName, // skuValueName：规格值名称
        //           imgUrl: data.imgUrl, // 规格类目图片，只有第一个规格类目可以定义图片
        //           previewImgUrl: data.previewImgUrl // 用于预览显示的规格类目图片
        //         }
        //       ],
        //       k_s: 's1'// skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        //     }
        //   ],
        //   // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        //   list: [
        //     {
        //       id: data._id, // skuId，下单时后端需要
        //       price: data.goodsId.integral, // 价格（单位分）
        //       s1: data.skuValueId, // 规格类目 k_s 为 s1 的对应规格值 id
        //       stock_num: data.goodsId.quantity // 当前 sku 组合对应的库存
        //     }
        //   ],
        //   price: data.goodsId.integral, // 默认价格（单位元）
        //   stock_num: data.goodsId.quantity, // 商品总库存
        //   collection_id: 30349, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        //   none_sku: data.noneSku, // 是否无规格商品
        //   hide_stock: false // 是否隐藏剩余库存
        // }
      })
    },
    handleBuy() {
      this.getSku()
      this.$refs['sku'].showSuk(this.sku, this.goods)
      this.showSku = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
