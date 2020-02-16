<template>
  <div class="container">
    <div class="shoppingItem">
      <van-checkbox-group ref="checkboxGroup" v-model="select">
        <van-checkbox v-for="i in 4" :key="i" name="a" class="van-hairline--bottom">
          <van-card
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          >
            <div slot="num">
              <van-stepper v-model="value" @click.prevent="change" />
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
export default {
  name: 'ShoppingCar',
  components: {},
  data() {
    return {
      select: [],
      checked: '',
      value: 0
    }
  },
  methods: {
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
</style>
