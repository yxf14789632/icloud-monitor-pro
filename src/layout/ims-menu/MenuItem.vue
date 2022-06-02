<template>
  <template v-for="menu in menuList" :key="menu.path">
    <template v-if="!menu.meta.sideTab">
      <el-sub-menu
        v-if="menu.children && menu.children.length > 0"
        :index="menu.path"
      >
        <template #title>
          <svg-icon
            :name="menu.meta.icon"
            :width="16"
            :height="16"
            color="#000000"
          ></svg-icon>
          <span style="margin-left: 12px">{{ menu.meta.title }}</span>
        </template>
        <menu-item :menuList="menu.children"></menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="menu.path">
        <template #title>
          <svg-icon
            :name="menu.meta.icon"
            :width="16"
            :height="16"
            color="#000000"
          ></svg-icon>
          <span style="margin-left: 12px">{{ menu.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-else>
      <menu-item :menuList="menu.children"></menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
defineProps(['menuList'])
</script>

<style scoped>
.is-active .svg-icon {
  color: #409eff !important;
}
</style>
