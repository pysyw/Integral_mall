<template>
  <div class="container">
    <div class="shoppingItem">
      <van-checkbox-group ref="checkboxGroup" v-model="select">
        <van-checkbox v-for="item in tableData" :key="item._id" :name="item._id" class="van-hairline--bottom">
          <van-card
            :price="item.skuId.goodsId.integral"
            :desc="item.skuId.goodsId.goodsDetail"
            :title="item.skuId.goodsId.goodsName"
            :thumb="item.skuId.goodsId.picture"
          >
            <div slot="num">
              <van-stepper v-model="item.selectedNum" @click.prevent="change" />
            </div>
          </van-card>
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      v-if="true"
      :price="3050"
      button-text="提交订单"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
      <span slot="tip">
        你的收货地址不支持同城送, <span>修改地址</span>
      </span>
    </van-submit-bar>
  </div>
</template>
<script>
import { getShoppingCarList } from '@/api/shoppingCar'
import store from '@/store'
export default {
  name: 'ShoppingCar',
  components: {},
  data() {
    return {
      select: [],
      tableData: [],
      checked: '',
      value: 0,
      params: {}
    }
  },
  computed: {
    consumerId() {
      return store.state.consumerId
    }
  },
  mounted() {
    this.getLists()
  },
  methods: {
    getLists() {
      getShoppingCarList(this.consumerId).then(res => {
        this.tableData = res.data
      })
    },
    change() {
      console.log(1)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .van-checkbox__label{
    width: 100%
}
.shoppingItem{
    padding:10px 20px
}
::v-deep .van-submit-bar{
    bottom: 100px
}
.contaner{
    min-height: calc(100vh - 200px);
    padding-bottom: 200px;
}
::v-deep .van-card__bottom{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px
}
</style>
