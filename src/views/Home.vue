<!--
 * @Author: mavon
 * @Date: 2021-12-27 19:28:48
 * @LastEditTime: 2021-12-27 20:46:45
 * @LastEditors: mavon
 * @Description: 111
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from 'components/HelloWorld.vue' // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  }
})
</script>
