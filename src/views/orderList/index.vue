<template>
  <div class="container">
    <navBar :title="title" />
    <van-card
      v-for="(item, index) in tableData"
      :key="index"
      :num="item.sku.selectedNum"
      :price="item.goodsName.integral"
      :desc="item.goodsName.goodsDetail"
      :title="item.goodsName.goodsName"
      :thumb="item.goodsName.picture"
      @click="goto(item._id, item.sku.selectedNum)"
    >
      <div slot="footer">
        <van-tag v-if="item.status === 0" plain type="danger">未付款</van-tag>
        <van-tag v-else plain type="success">已付款</van-tag>
      </div>
    </van-card>
  </div>
</template>
<script>
import { getOrderLists } from '@/api/order'
import store from '@/store'
import navBar from '@/components/navBar'
export default {
  name: 'OrderList',
  components: {
    navBar
  },
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    status() {
      return this.$route.params.status
    },
    consumerId() {
      return store.state.consumerId
    },
    title() {
      if (this.status === '0') {
        return '未付款订单'
      } else if (this.status === '1') {
        return '已付款订单'
      } else {
        return '所有订单'
      }
    }
  },
  mounted() {
    this.getLists()
  },
  methods: {
    getLists() {
      const params = {
        consumerId: this.consumerId,
        status: this.status
      }
      getOrderLists(params).then(res => {
        this.tableData = res.data || []
      })
    },
    goto(orderId, selectedNum) {
      this.$router.push(`/order/${orderId}/${selectedNum}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
    margin-top: 92px
}
</style>
