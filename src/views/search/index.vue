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
            v-model="queryList.goodsName"
            placeholder="请输入商品名称"
          />
        </div>
      </template>
      <template #right>
        <van-button size="small" round>搜索</van-button>
      </template>
    </van-nav-bar>
    <div class="goodsWrap">
      <div v-for="(item, index) in goods" :key="index" class="goodsItem" @click="goto('goodsDetail', item._id)">
        <div class="goodsPicWrap">
          <img class="fullWidth" :src="item.picture">
        </div>
        <div class="goodsInfoWrap">
          <div class="descripteWrap">
            <span class="goodsName">{{ item.goodsName }}</span>
            <p class="desc">{{ item.goodsDetail }}</p>
            <span class="price"> 积分:<span class="number">{{ item.integral }}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { searchGoods } from '@/api/goods'
export default {
  name: 'Search',
  data() {
    return {
      queryList: {
        goodsName: ''
      },
      goods: []
    }
  },
  methods: {
    handleSearch() {
      searchGoods(this.queryList).then(res => {
        if (res.code === 200) {
          this.goods = res.data
        }
      })
    },
    goto(url, id) {
      this.$router.push(`/${url}/${id}`)
    },
    onClickRight() {
      this.handleSearch()
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
        // max-height: 100vh;
        // overflow-y: scroll;
        .goodsItem{
            display: flex;
            box-sizing: border-box;
            max-height: 250px;
            padding:20px 20px;
            position: relative;
            &::after {
              position: absolute;
              box-sizing: border-box;
              content: ' ';
              pointer-events: none;
              right: 0;
              bottom: 0;
              left: 16px;
              border-bottom: 1px solid #ebedf0;
              -webkit-transform: scaleY(0.5);
              transform: scaleY(0.5);
            }
            .goodsPicWrap {
              width: 196px;
              max-height: 196px;
            }
            .goodsInfoWrap {
              width:100%;
              display: flex;
              align-items: center;
              .descripteWrap{
                padding: 10px;
                .goodsName{
                  font-size:30px
                }
                .desc {
                  font-size: 18px;
                  margin: 5px 0;
                  color:#999;
                  text-overflow: -o-ellipsis-lastline;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                .price{
                  color: red;
                  .number{
                    font-size: 32px;
                  }
                }
              }

            }
        }
    }
</style>
