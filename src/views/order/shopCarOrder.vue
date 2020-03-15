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
          {{ userInfo.addressDetail }}
        </div>
      </div>
    </div>
    <div class="goddsWrap mg-tp-20">
      <div v-for="(item, index) in tableData" :key="index">
        <van-card
          :desc="item.skuId.goodsId.goodsDetail"
          :title="item.skuId.goodsId.goodsName"
          :price="item.skuId.goodsId.integral"
          :thumb="item.skuId.goodsId.picture"
        >
          <div slot="num">
            x{{ queryList[index].amount }}
          </div>
        </van-card>
        <div class="priceWrap">
          <span>实付款（含运费）</span>
          <span>￥{{ countPrice(queryList[index].amount ,item.skuId.goodsId.integral) }}</span>
        </div>
      </div>
    </div>
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="提交订单"
      @submit="handleOnSubmit"
    />
  </div>
</template>
<script>
import { Toast } from 'vant'
import navBar from '@/components/navBar'
import { getOrderByShopCar, orderCar } from '@/api/order'
import { getList } from '@/api/address'
export default {
  name: 'Order',
  components: {
    navBar
  },
  data() {
    return {
      queryList: [],
      skuData: {},
      userInfo: {},
      address: '',
      tableData: [],
      amount: 0
    }
  },
  computed: {
    goodsPriceArr() {
      return this.tableData.map(item => {
        return item.skuId.goodsId.integral
      })
    },
    totalPrice() {
      const amountArr = this.queryList.map(item => {
        return item.amount
      })
      let result = 0
      amountArr.forEach((item, index) => {
        result += this.goodsPriceArr[index] * item
      })
      return result
    }
  },
  mounted() {
    this.queryList = this.$route.query.data
    this.getData()
    this.getRevecer()
  },
  methods: {
    getData() {
      getOrderByShopCar(this.queryList).then(res => {
        this.tableData = res.data
      })
    },
    handleOnSubmit() {
      const params = this.tableData.map((item, index) => {
        return {
          amount: this.queryList[index].amount,
          sku: item.skuId._id,
          id: item._id,
          consumer: this.userInfo.consumerId._id
        }
      })
      this.handleOrder(params)
    },
    // 购物车下单
    handleOrder(data) {
      orderCar(data).then(res => {
        const that = this
        Toast({
          message: '购买成功',
          type: 'success',
          duration: 1000,
          onClose: () => {
            data.forEach(item => {
              this.$store.commit('REMOVE_SHOP_CAR', data._id)
            })
            that.$router.push('/shoppingCar')
          }
        })
      })
    },
    getRevecer() {
      getList().then(res => {
        this.userInfo = res.data.filter(item => item.isDefault === true)[0]
        console.log(this.userInfo)
      })
    },
    countPrice(amount, goodsPrice) {
      const price = amount * goodsPrice
      return price
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
    padding-bottom: 100px;
    background: #ccc;
    min-height: calc(100vh - 192px)
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
