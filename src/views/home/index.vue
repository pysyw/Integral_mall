<template>
  <div ref="contanier" class="home tabHeight">
    <van-loading v-if="fristLoading" type="spinner" color="#1989fa" size="100px" />
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="getPageData"
    >
      <div class="searchWrap">
        <div class="search" @click="goto('search')">
          <div style="display: flex;align-items: center;marginLeft:10px">
            <van-icon name="search" size="20" />
            <span>请搜索您心思思的商品</span>
          </div>
          <van-button class="searchBtn" size="small" round>搜索</van-button>
        </div>
      </div>
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
              <svg-icon icon-class="zhiliang" />
              <p>质量保证</p>
            </div>
          </van-col>
          <van-col span="6">
            <div class="flex-column-center">
              <svg-icon icon-class="fahuo" />
              <p>日内发货</p>
            </div>
          </van-col>
          <van-col span="6">
            <div class="flex-column-center">
              <svg-icon icon-class="dazhong" />
              <p>福利大众</p>
            </div>
          </van-col>
          <van-col span="6">
            <div class="flex-column-center">
              <svg-icon icon-class="wumeijialian" />
              <p>价廉物美</p>
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
                <p>{{ item.categoryName }}</p>
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
        <div v-for="(item, index) in goods" :key="index" class="goodsItem">
          <div class="flex-column-center" @click="goto('goodsDetail', item._id)">
            <div class="goodsPicWrap">
              <img :src="item.picture" class="img-responsive">
            </div>
            <p class="goodsName">{{ item.goodsName }}</p>
            <span>￥{{ item.integral }}</span>
          </div>
        </div>
      </div>
    </van-list>
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
      fristLoading: true,
      date: 0,
      images: [],
      goods: [],
      priceSpikeGoods: [],
      total: 0,
      categoryArr: [],
      loading: false,
      finished: false,
      queryList: {
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  mounted() {
    this.getPageData()
    this.date = new Date().setHours(24, 0, 0, 0)
  },
  methods: {
    onLoad() {
      console.log(333)
    },
    getPageData() {
      this.loading = true
      this.finished = false
      getData(this.queryList).then(res => {
        const data = res.data
        this.images = data.swipeArr
        this.goods = this.goods.concat(data.goods)
        this.priceSpikeGoods = data.priceSpike
        this.categoryArr = data.category
        this.total = data.total
        this.fristLoading = false
        this.loading = false
        this.queryList.pageNum++
        if (this.goods.length === this.total) {
          this.finished = true
        }
      })
    },
    goto(url, id) {
      if (!id) {
        this.$router.push(`/${url}`)
      } else {
        this.$router.push(`/${url}/${id}`)
      }
    }
    // scrollEvent(e) {
    //   const scrollBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
    //   if (this.goods.length === this.total) {
    //     this.loading = false
    //     this.finished = true
    //     return
    //   }
    //   if (scrollBottom === 0) {
    //     this.loading = true
    //     this.queryList.pageNum += 1
    //     getData(this.queryList).then(res => {
    //       this.goods = this.goods.concat(res.data.goods)
    //       this.loading = false
    //     })
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
.van-loading {
  position:absolute;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%)
}
</style>
