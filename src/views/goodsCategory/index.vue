<template>
  <div class="container">
    <nav-bar title="分类" />
    <div class="goodsWrap">
      <van-row>
        <van-col v-for="(item, index) in goods" :key="index" span="12">
          <div class="flex-column-center" @click="goto('goodsDetail', item._id)">
            <img :src="item.picture" class="img-responsive">
            <p class="goodsName">{{ item.goodsName }}</p>
            <span>￥{{ item.integral }}</span>
          </div>
        </van-col>
      </van-row>
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
      goods: []
    }
  },
  computed: {
    categoryId() {
      return this.$route.params.categoryId
    }
  },
  mounted() {
    getGoodsByCategoryId(this.categoryId).then(res => {
      const data = res.data
      this.goods = data
    })
  },
  methods: {
    goto(url, id) {
      this.$router.push(`/${url}/${id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
    @import './style.scss';
</style>
