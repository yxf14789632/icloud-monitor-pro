<!--
 * @Author: Mavon
 * @Description:
 * @Date: 2022-01-14 16:00:47
 * @LastEditTime: 2022-06-06 22:03:37
 * @FilePath: /icloud-monitor-pro/src/layout/ims-menu/index.vue
-->
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
import { computed, ref } from 'vue'
import { hasPermission } from '@/utils/validate'

const store = useStore()
const route = useRoute()

const user = computed(() => store.state.login.userInfo)
const openeds = ref([] as string[])
const routes = store.getters['getRoutes'].filter((route: any) =>
  hasPermission(user.value.roles, route)
)

const expandRoutes = routes.filter(
  (item: { children: string | any[] }) =>
    item.children && item.children.length > 0
)
expandRoutes.forEach((item: { path: any }) =>
  openeds.value.push(item.path as string)
)

const handleOpen = () => {}
const handleClose = () => {}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
