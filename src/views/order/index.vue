<template>
  <div class="container">
    <nav-bar title="订单详情" />
    <div class="banner">
      <img class="fullWidth" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1833652302,1253219506&fm=26&gp=0.jpg">
    </div>
    <div class="addressWrap">
      <div class="iconWrap">
        <svg-icon icon-class="express" />
      </div>
      <div v-if="tableData.status !== 0" class="descWrap">
        <div class="info">{{ address.name }} <span class="phone mg-left-20">{{ address.phoneNumber }}</span></div>
        <div class="detail">
          {{ address.addressDetail }}
        </div>
      </div>
      <div v-else class="descWrap" @click="showPop(address._id)">
        <div class="info">{{ address.name }} <span class="phone mg-left-20">{{ address.phoneNumber }}</span></div>
        <div class="detail">
          {{ address.addressDetail }}
        </div>
      </div>
      <i v-if="tableData.status === 0" class="van-icon van-icon-arrow van-cell__right-icon" />
    </div>
    <div class="goddsWrap mg-tp-20">
      <van-card
        :desc="skuData.goodsDetail"
        :title="skuData.goodsName"
        :price="skuData.integral"
        :thumb="skuData.picture"
      >
        <div slot="num">
          x{{ amount }}
        </div>
      </van-card>
      <div class="priceWrap">
        <span>实付款（含运费）</span>
        <span>￥{{ totalPrice }}</span>
      </div>
    </div>
    <van-submit-bar
      v-if="tableData.status === 0"
      :price="totalPrice * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
    <van-submit-bar
      v-else
      disabled
      :price="totalPrice * 100"
      button-text="已付款"
    />
    <v-popoup ref="popup" @handleSelectAddress="handleSelectAddress" />
  </div>
</template>
<script>
import { Toast } from 'vant'
import navBar from '@/components/navBar'
import store from '@/store'
import VPopoup from '@/components/popup'
import { getOrderBySkuId, order } from '@/api/order'
export default {
  name: 'Order',
  components: {
    navBar,
    VPopoup
  },
  data() {
    return {
      skuData: {},
      goodsPrice: '',
      userInfo: {},
      address: '',
      tableData: {},
      amount: 0
    }
  },
  computed: {
    consumerId() {
      return store.state.consumerId
    },
    orderId() {
      return this.$route.params.orderId
    },
    totalPrice() {
      return this.amount * this.goodsPrice
    },
    selectedNum() {
      return this.$route.params.selectedNum
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const params = { consumerId: this.consumerId, _id: this.orderId }
      getOrderBySkuId(params).then(res => {
        this.tableData = res.data
        this.skuData = res.data.sku.goodsId
        this.goodsPrice = res.data.sku.goodsId.integral
        this.userInfo = res.data.consumer
        this.address = res.data.addressId
        this.amount = res.data.amount
      })
    },
    onSubmit() {
      const params = {
        _id: this.tableData._id,
        amount: this.amount,
        consumerIntegral: this.userInfo.nowIntegral,
        addressId: this.address._id,
        goodsId: this.tableData.goodsName,
        category: this.tableData.category,
        totalPrice: this.totalPrice,
        quantity: this.skuData.quantity
      }
      order(params).then(res => {
        if (res.code === 200) {
          Toast({
            type: 'success',
            message: '购买成功',
            onOpened: () => {
              this.$router.replace('/my')
            }
          })
        }
      })
      console.log(order)
    },
    showPop(addressId) {
      this.$refs.popup.showPop(addressId)
    },
    handleSelectAddress(data) {
      this.address._id = data.id
      this.address.name = data.name
      this.address.addressDetail = data.address
      this.address.isDefault = data.isDefault
    }
  }
}
</script>
<style lang="scss" scoped>
.mg-left-20{
    margin-left: 20px
}
.container{
    padding-top: 92px;
    background: #ccc
}
.banner {
    background: white
}
.addressWrap {
    background: white;
    display: flex;
    padding: 20px;
    align-items: center;
    .iconWrap {
        .svg-icon{
            width: 60px;
            height: 60px;
        }
    }
    .descWrap{
        flex: 1;
        margin-left: 20px;
        line-height: 1.6;
        .info{
        }
    }
}
.van-card__content{
    justify-content: center;
    flex-direction: column;
    display: flex;
}
.priceWrap{
    background: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center
}
</style>
