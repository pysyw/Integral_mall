<template>
  <div class="container">
    <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #title>
        <div>
          <van-field
            v-model="queryList.name"
            placeholder="请输入商品名称"
          />
        </div>
      </template>
      <template #right>
        <van-button size="small" round>搜索</van-button>
      </template>
    </van-nav-bar>
    <div class="goodsWrap">
      111
    </div>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      queryList: {
        name: ''
      }
    }
  },
  methods: {
    onClickRight() {
      console.log('right')
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/variable.scss';
  ::v-deep .van-field__control{
    border: 1px solid $theme;
    padding: 1px 20px;
  }
  .van-nav-bar__title{
    max-width: 65%;
    margin-left: 100px;
  }
  ::v-deep .van-cell {
    padding: 20px 0;
  }
  .goodsWrap{
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        // max-height: 100vh;
        // overflow-y: scroll;
        .goodsItem{
            box-sizing: border-box;
            width: 50%;
            padding: 10px;
            .goodsPicWrap {
                width: 200px;
                min-height: 200px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>
