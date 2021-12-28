<template>
  <div id="nav">
    <h2>{{ $store.state.name }}</h2>
    <router-link to="/">Home</router-link> |
    <!-- <router-link to="/about">About</router-link> -->
  </div>
  <router-view />

  <el-button>test</el-button>
  <el-button type="primary">test</el-button>
  <el-button type="danger">test</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'app',
  components: {
    ElButton
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
