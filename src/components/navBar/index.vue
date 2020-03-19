<template>
  <div>
    <van-nav-bar
      :title="title"
      :left-arrow="showArrow"
      :fixed="fixed"
      :style="{'background': backgroundColor}"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <div slot="left" :style="{'font-size':fontSize,'color':fontColor,'font-weight': fontWeight}">
        <van-icon name="arrow-left" size="20" :color="fontColor" />
        {{ leftText }}
      </div>
      <div slot="right" :style="{'color':fontColor,'font-size':fontSize,'font-weight': fontWeight}">{{ rightText }}</div>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  props: {
    title: {
      type: String,
      defalut: '',
      required: true
    },
    leftText: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    fontColor: {
      type: String,
      default: '#1989fa'
    },
    fixed: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: String,
      default: '15px'
    },
    fontWeight: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
      this.$emit('onClickLeft')
    },
    onClickRight() {
      console.log('onClickRight')
      this.$emit('onClickRight')
    }
  }
}
</script>
<style lang="scss" scoped>
.van-hairline--bottom{
  &::after{
    border: none;
  }
}
</style>
