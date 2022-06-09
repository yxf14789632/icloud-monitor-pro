<!--
 * @Author: Mavon
 * @Description:
 * @Date: 2022-01-14 13:44:13
 * @LastEditTime: 2022-06-08 15:15:05
 * @FilePath: /icloud-monitor-pro/src/layout/ims-nav/index.vue
-->
<template>
  <div class="ims-nav">
    <el-row :gutter="15">
      <el-col :span="24" :xs="4" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <el-icon style="margin-right: 20px"><fold /></el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in tabs" :key="item.meta.path">
              <svg-icon
                :name="item.meta.icon"
                :width="16"
                :height="16"
                color="#000000"
              ></svg-icon>
              <span>{{ ' ' + item.meta.title }}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
      <el-col :span="24" :xs="4" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <el-icon class="ims-icon-fullcreen" @click="onToggle"
            ><full-screen
          /></el-icon>
          <el-icon class="ims-icon-refresh"><refresh /></el-icon>
          <el-dropdown>
            <span class="avatar-dropdown">
              <el-avatar class="user-avatar"></el-avatar>

              <span class="user-name">
                {{ userInfo.nickname }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import { ElMessageBox } from 'element-plus'
import { logoutRequest } from '@/service/login/login'
import screenfull from 'screenfull'

const tabs: Ref<RouteLocationMatched[]> = ref([])

const route = useRoute()
const router = useRouter()
const userInfo = localCache.getCache('userInfo')

const getBredcurm = () => {
  let mached = route.matched.filter((item) => item.meta && item.meta.title)
  // 设置面包屑导航数据
  tabs.value = mached
}

const logout = () => {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    logoutRequest().then(() => {
      localCache.clearCache()
      sessionStorage.removeItem('tabsView')
      router.push(`/login`)
    })
  })
}
const onToggle = () => {
  screenfull.toggle()
}

getBredcurm()

watch(
  () => route.path,
  () => getBredcurm()
)
</script>

<style scoped>
.ims-nav .right-panel [class*='ims-'] {
  margin-left: 20px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
}
</style>
