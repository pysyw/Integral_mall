<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <van-button type="info">默认按钮</van-button>
     <svg-icon icon-class="test" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {Button} from 'vant'
export default {
  name: 'home',
  components: {
    HelloWorld,
    VanButton:Button
  }
}
</script>
