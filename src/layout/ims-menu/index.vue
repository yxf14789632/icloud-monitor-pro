<template>
  <el-menu
    :default-active="route.path"
    :default-openeds="openeds"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-divider>{{ store.getters['getSideTab'].title }}</el-divider>
    <MenuItem :menuList="store.getters['getRoutes']"> </MenuItem>
  </el-menu>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import { useStore } from '@/store/index'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const store = useStore()
const route = useRoute()

const openeds = ref([] as string[])
const routes = store.getters['getRoutes']
const expandRoutes = routes.filter(
  (item: { children: string | any[] }) =>
    item.children && item.children.length > 0
)
expandRoutes.forEach((item: { path: any }) =>
  openeds.value.push(item.path as string)
)

const handleOpen = () => {
  console.log(111)
}
const handleClose = () => {
  console.log(222)
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
