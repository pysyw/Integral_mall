<template>
  <div class="container">
    <nav-bar title="订单详情" />
    <div class="banner">
      <img class="fullWidth" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1833652302,1253219506&fm=26&gp=0.jpg">
    </div>
    <div class="addressWrap">
      <div class="iconWrap">
        <svg-icon icon-class="test" />
      </div>
      <div class="descWrap">
        <div class="info">{{ userInfo.name }} <span class="phone mg-left-20">{{ userInfo.phoneNumber }}</span></div>
        <div class="detail">
          {{ address }}
        </div>
      </div>
    </div>
    <div class="goddsWrap mg-tp-20">
      <van-card
        :desc="skuData.goodsDetail"
        :title="skuData.goodsName"
        :price="skuData.integral"
        :thumb="skuData.picture"
      >
        <div slot="num">
          x{{ selectedNum }}
        </div>
      </van-card>
      <div class="priceWrap">
        <span>实付款（含运费）</span>
        <span>￥{{ totalPrice }}</span>
      </div>
    </div>
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>
<script>
import { Toast } from 'vant'
import navBar from '@/components/navBar'
import store from '@/store'
import { getOrderBySkuId, order } from '@/api/order'
export default {
  name: 'Order',
  components: {
    navBar
  },
  data() {
    return {
      skuData: {},
      goodsPrice: '',
      userInfo: {},
      address: '',
      tableData: {}
    }
  },
  computed: {
    consumerId() {
      return store.state.consumerId
    },
    goodsId() {
      return this.$route.params.goodsId
    },
    totalPrice() {
      return this.selectedNum * this.goodsPrice
    },
    selectedNum() {
      return this.$route.params.selectedNum
    }
  },
  mounted() {
    console.log(this.goodsId)
    this.getData()
  },
  methods: {
    getData() {
      const params = { consumerId: this.consumerId, skuId: this.goodsId }
      getOrderBySkuId(params).then(res => {
        this.tableData = res.data
        this.skuData = res.data.sku.goodsId
        this.goodsPrice = res.data.sku.goodsId.integral
        this.userInfo = res.data.consumer
        this.address = res.data.addressId.addressDetail
      })
    },
    onSubmit() {
      const params = {
        _id: this.tableData._id
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
