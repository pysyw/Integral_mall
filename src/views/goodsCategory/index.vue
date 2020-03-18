<template>
  <div class="container">
    <nav-bar title="分类" />
    <div v-if="goods.length !== 0" class="goodsWrap" @scroll.passive="scrollEvent">
      <div v-for="(item, index) in goods" :key="index" class="goodsItem">
        <div class="flex-column-center" @click="goto('goodsDetail', item._id)">
          <img :src="item.picture" class="img-responsive">
          <p class="goodsName">{{ item.goodsName }}</p>
          <span>￥{{ item.integral }}</span>
        </div>
      </div>
      <div v-if="loading" style="width:100%" class="flex-center">
        <van-loading size="24px">加载中...</van-loading>
      </div>
      <div v-if="finished" style="width:100%" class="flex-center">没有更多了~~</div>
    </div>
    <div v-else class="nohaveshop">
      <van-icon name="smile-o" />
      <p class="p1">暂时缺货~~</p>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/navBar'
import { getGoodsByCategoryId } from '@/api/goods.js'
export default {
  name: 'GoodsCategory',
  components: {
    NavBar
  },
  data() {
    return {
      goods: [],
      loading: false,
      finished: false,
      queryList: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  computed: {
    categoryId() {
      return this.$route.params.categoryId
    },
    params() {
      return Object.assign({ categoryId: this.categoryId }, this.queryList)
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    goto(url, id) {
      this.$router.push(`/${url}/${id}`)
    },
    getData() {
      getGoodsByCategoryId(this.params).then(res => {
        const data = res.data
        this.total = res.total
        this.goods = data || []
      })
    },
    scrollEvent(e) {
      const scrollBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
      if (this.goods.length === this.total) {
        this.loading = false
        this.finished = true
        return
      }
      if (scrollBottom === 0) {
        this.loading = true
        this.queryList.pageNum += 1
        getGoodsByCategoryId(this.params).then(res => {
          this.goods = this.goods.concat(res.data.goods)
          this.loading = false
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    @import './style.scss';
    .nohaveshop {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 200px;
      .van-icon {
        font-size: 120px;
        color: #666;
      }
      p {
        font-size: 28px;
        color: #999;
      }
      .p1 {
        margin-top: 40px;
      }
    }
</style>
