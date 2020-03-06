<template>
  <div>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      :hide-quota-text="hideQuota"
      @show="showSuk"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>
<script>
import { Toast } from 'vant'
import store from '@/store'
import { addShoppingCar, editShoppingCar } from '@/api/shoppingCar'
import { addOrder } from '@/api/order'
export default {
  props: {
    goodsId: {
      type: String,
      default: ''
    },
    quota: {
      type: Number,
      default: 0
    },
    quotaUsed: {
      type: Number,
      default: 0
    },
    hideQuota: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      sku: {},
      goods: {},
      orderId: ''
    }
  },
  computed: {
    consumerId() {
      return store.state.consumerId
    },
    shoppingCar() {
      return store.state.shoppingCar
    }
  },
  methods: {
    addShopCar(data) {
      addShoppingCar(data).then(res => {
        this.show = false
        Toast({
          type: 'success',
          message: '添加成功',
          duration: 500
        })
      })
    },
    editShopCar(data) {
      editShoppingCar(data).then(res => {
        this.show = false
        Toast({
          type: 'success',
          message: '添加成功',
          duration: 500
        })
      })
    },
    handleAddOrder(params, skuData) {
      addOrder(params).then(res => {
        this.orderId = res.data._id
        this.$router.push(`/order/${this.orderId}/${skuData.selectedNum}`)
      })
    },
    onBuyClicked(skuData) {
      const params = {
        goodsName: skuData.goodsId,
        consumer: this.consumerId,
        sku: skuData.selectedSkuComb.id,
        amount: skuData.selectedNum
      }
      this.handleAddOrder(params, skuData)
    },
    onAddCartClicked(skuData) {
      const skuId = skuData.selectedSkuComb.id
      const selectedNum = skuData.selectedNum
      const requestBody = { skuId, selectedNum, consumerId: this.consumerId }
      const hasAddShoppingCar = this.shoppingCar.includes(skuData.selectedSkuComb.id)
      // const requestBody = {
      //   skuKeyName: this.sku.tree[0].k,
      //   skuValueId: this.sku.tree[0].v[0].id,
      //   skuValueName: this.sku.tree[0].v[0].name,
      //   noneSku: this.sku.none_sku,
      //   goodsId: this.goodsId,
      //   imgUrl: this.sku.tree[0].v[0].imgUrl,
      //   previewImgUrl: this.sku.tree[0].v[0].previewImgUrl,
      //   consumerId: this.consumerId,
      //   selectedNum: skuData.selectedNum
      // }
      if (hasAddShoppingCar) {
        // 已添加过在购物车中
        this.editShopCar(requestBody)
      } else {
        // 未添加过购物车
        this.addShopCar(requestBody)
        const carItemId = skuData.selectedSkuComb.id
        this.$store.dispatch('setShopCar', carItemId)
      }
    },
    showSuk(sku, goods) {
      if (sku.tree.length !== 0) {
        this.show = true
        this.sku = sku
        this.goods = goods
      } else {
        return
      }
    }
  }
}
</script>
