<template>
  <div class="ims-nav">
    <el-row :gutter="15">
      <el-col :span="24" :xs="4" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <el-icon style="margin-right: 20px"><fold /></el-icon>
        </div>
      </el-col>
      <el-col :span="24" :xs="4" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <el-icon class="ims-icon-fullcreen"><full-screen /></el-icon>
          <el-icon class="ims-icon-refresh"><refresh /></el-icon>
          <el-dropdown>
            <span class="avatar-dropdown">
              <el-avatar
                class="user-avatar"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>

              <span class="user-name">
                admin
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/index'

const route = useRoute()
const store = useStore()

const getBredcurm = () => {
  // 获取所有有meta和title的数据
  const routes = store.getters['getRoutes']
  // let mached = routes.filter((item: any) => item.meta && item.meta.title)
  // // 判断第一个是否是首页 如果不是，则构造一个
  // const first = mached[0]
  // if (first.path !== '/index') {
  //   let sideTab: IVaiTab = store.getters['getSideTab']
  //   mached = [
  //     { path: sideTab.path, meta: { title: sideTab.title } } as any
  //   ].concat(mached)
  // }
  // // 设置面包屑导航数据
  // tabs.value = mached
}

getBredcurm()

watch(
  () => route.path,
  () => getBredcurm()
)
</script>
