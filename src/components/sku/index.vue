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
export default {
  props: {
    goodsId: {
      type: Number,
      default: 0
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
      goods: {}
    }
  },
  methods: {
    onBuyClicked(skuData) {
      console.log(skuData)
    },
    onAddCartClicked(skuData) {
      console.log(skuData)
    },
    showSuk(sku, goods) {
      this.show = true
      this.sku = sku
      this.goods = goods
    }
  }
}
</script>
