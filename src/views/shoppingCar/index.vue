<template>
  <div class="shopCart">
    <div class="cartList">
      <ul v-if="tableData.length > 0">
        <li v-for="(item, index) in tableData" :key="index">
          <van-checkbox
            ref="checkboxGroup"
            v-model="item.isChecked"
            :value="item.id"
            checked-color="#15C481"
            @change="chooseChange(item.isChecked, item)"
          />
          <div class="shopdetail">
            <div class="detailimg">
              <img :src="item.skuId.goodsId.picture">
            </div>
            <div class="detailtext">
              <div class="shoptitle van-multi-ellipsis--l2">
                {{ item.skuId.goodsId.goodsName }}
              </div>
              <div class="shoppricenum">
                <p class="shopprice">
                  ¥{{ item.skuId.goodsId.integral }}
                </p>
                <div class="shopnum">
                  <van-stepper v-model="item.selectedNum" max="9" @change="onChange(item.selectedNum, index)" />
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="nohaveshop">
        <van-icon name="shopping-cart-o" />
        <p class="p1">你的购物车空空如也~~</p>
        <p class="p2">快去采购吧!</p>
      </div>
    </div>
    <van-submit-bar
      :price="sum"
      button-text="提交订单"
      @submit="handleSubmit"
    >
      <van-checkbox v-model="checkAll" @click="selectAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import { getShoppingCarList } from '@/api/shoppingCar'
import { orderCar } from '@/api/order'
import store from '@/store'
export default {
  name: 'ShoppingCar',
  components: {},
  data() {
    return {
      tableData: [],
      allchecked: false,
      selectedData: [],
      // 总价
      totalprice: 0,
      totallvd: 0,
      checkAll: false
    }
  },
  computed: {
    consumerId() {
      return store.state.consumerId
    },
    addressId() {
      return store.state.addressId
    },
    sum() {
      let price = 0
      this.tableData.forEach(item => {
        if (item.isChecked) {
          price += item.selectedNum * item.skuId.goodsId.integral * 100
        }
      })
      return price
    },
    allSelect() {
      const selected = this.tableData.every(item => {
        return item.isChecked === true
      })
      return selected
    }
  },
  watch: {
    allSelect(value) {
      this.checkAll = value
    }
  },
  mounted() {
    this.getLists()
  },
  methods: {
    getLists() {
      getShoppingCarList(this.consumerId).then(res => {
        this.tableData = res.data
        console.log(this.tableData)
      })
    },
    // 购物车下单
    handleOrder(data) {
      orderCar(data).then(res => {
        console.log(res.data)
      })
    },
    chooseChange(checked, item) {
      if (checked) {
        this.selectedData.push(item)
      } else {
        this.selectedData.splice(this.selectedData.findIndex(a => a._id === item._id), 1)
      }
    },
    onChange(num, index) {
      this.tableData[index].selectedNum = num
      // this.totalprice = total + price
    },
    selectAll() {
      if (!this.allSelect) {
        const checkboxGroup = this.$refs.checkboxGroup
        checkboxGroup.forEach(item => {
          item.checked = true
        })
        this.checkAll = this.allSelect
      } else {
        this.checkAll = this.allSelect
        const checkboxGroup = this.$refs.checkboxGroup
        checkboxGroup.forEach(item => {
          item.checked = false
        })
      }
    },
    handleSubmit() {
      if (this.checkAll) {
        const data = Array.from(this.tableData)
        this.selectedData = data
        const params = data.map(item => {
          return {
            goodsName: item.skuId.goodsId.goodsName,
            category: item.skuId.goodsId.category,
            consumer: this.consumerId,
            sku: item.skuId._id,
            addressId: this.addressId,
            amount: item.selectedNum
          }
        })
        this.handleOrder(params)
      } else {
        const params = this.selectedData.map(item => {
          return {
            goodsName: item.skuId.goodsId.goodsName,
            category: item.skuId.goodsId.category,
            consumer: this.consumerId,
            sku: item.skuId._id,
            addressId: this.addressId,
            amount: item.selectedNum
          }
        })
        this.handleOrder(params)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-submit-bar{
    bottom: 100px
}
.shopCart {
  width: 100%;
  min-height: calc(100vh - 200px);
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  .cartList {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 200px;
      li {
        width: 100%;
        height: 192px;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 24px;
        .van-checkbox {
          margin-left: 34px;
          ::v-deep .van-checkbox__icon {
            height: 28px;
            line-height: 28px;
            .van-icon {
              width: 28px;
              height: 28px;
              font-size: 24px;
              border: 1px solid #a5a5a5;
            }
          }
        }
        .shopdetail {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 26px;
          .detailimg {
            width: 128px;
            height: 128px;
            background: rgba(165, 165, 165, 1);
            border-radius: 8px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 8px;
            }
          }
          .detailtext {
            width: 460px;
            height: 120px;
            display: flex;
            flex-direction: column;
            margin-left: 16px;
            position: relative;
            .shoptitle {
              width: 360px;
              text-align: justify;
              font-size: 24px;
              color: #212121;
              line-height: 34px;
            }
            .shoppricenum {
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              position: absolute;
              bottom: 0px;
              .shopprice {
                font-size: 24px;
                color: #15c481;
                font-weight: 600;
              }
              .shopnum {
                display: flex;
                ::v-deep .van-stepper {
                  button {
                    width: 28px;
                    height: 28px;
                    border: 1px solid #333333;
                    border-radius: 100px;
                    background-color: #fff;
                  }
                  .van-stepper__minus::before {
                    width: 16px;
                  }
                  .van-stepper__plus::before {
                    width: 16px;
                  }
                  .van-stepper__plus::after {
                    height: 16px;
                  }
                  .van-stepper__input {
                    font-size: 24px;
                    color: #333333;
                    background-color: #fff;
                    padding: 0px 24px;
                  }
                }
              }
            }
          }
        }
      }
    }
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
  }
  .cartfotter {
    width: 100%;
    height: 120px;
    position: fixed;
    bottom: 0;
    left: 0;
    .van-submit-bar__bar {
      height: 120px;
      font-size: 32px;
      .van-checkbox {
        margin-left: 34px;
        ::v-deep .van-checkbox__icon {
          height: 28px;
          line-height: 28px;
          .van-icon {
            width: 28px;
            height: 28px;
            font-size: 24px;
            border: 1px solid #a5a5a5;
          }
        }
        ::v-deep .van-checkbox__label {
          font-size: 32px;
          color: #212121;
          margin-left: 18px;
        }
      }
      .buyprice {
        flex: 1;
        padding-right: 16px;
        text-align: right;
        display: flex;
        flex-direction: column;
        .p1 {
          font-size: 20px;
          color: #001410;
        }
        .p2 {
          font-size: 24px;
          color: #15c481;
          margin-top: 8px;
        }
      }
      .van-button--danger {
        width: 260px;
        height: 120px;
        background: rgba(21, 196, 129, 1);
        border: none;
        font-size: 32px;
        color: #ffffff;
      }
    }
  }
}
</style>
