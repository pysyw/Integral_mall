<template>
  <div>
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :left-arrow="showArrow"
      :fixed="fixed"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
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
    fixed: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClickLeft() {
      console.log('onClickLeft')
      this.$emit('onClickLeft')
    },
    onClickRight() {
      console.log('onClickRight')
      this.$emit('onClickRight')
    }
  }
}
</script>
