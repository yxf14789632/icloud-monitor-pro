<template>
  <el-tabs
    class="ims-left-tabs"
    tab-position="left"
    @tab-click="changeSideTab"
    :model-value="store.getters['getSideTab'].path"
  >
    <template v-for="item in userMenus" :key="item.path">
      <el-tab-pane
        v-if="item.parentId === 0"
        :label="item.meta.title"
        :name="item.path"
        :key="item.path"
      >
        <template #label>
          <span class="ims-column-grid">
            <svg-icon
              :name="item.meta.icon"
              :width="16"
              :height="16"
              color="#FFFFFF"
            ></svg-icon>
            <span>{{ item.meta.title }}</span>
          </span>
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store/index'

const store = useStore()

const userMenus = computed(() => store.state.login.userMenus)

const changeSideTab = (tab: any) => {
  const { props } = tab
  const sideTabName = props.label
  let sideTab = userMenus.value.filter(
    (item: { meta: { title: any } }) => item.meta.title === sideTabName
  )

  if (sideTab && sideTab.length > 0) {
    store.commit('setActiveSideTab', {
      title: sideTab[0].meta.title,
      path: sideTab[0].path
    })
    const routeList = sideTab[0].children
    if (routeList && routeList.length > 0) {
      store.commit('setRoutes', routeList)
    } else {
      store.commit('setRoutes', [])
    }
  }
}
</script>

<style lang="less">
.ims-left-tabs {
  position: fixed;
  height: 100%;
}

.ims-left-tabs .el-tabs__header .el-tabs__item {
  padding: 5px !important;
}

ims-left-tabs .el-tabs--left .el-tabs__header.is-left {
  float: left;
  margin-bottom: 0;
  margin-right: 10px;
}

.el-tabs__nav-wrap.is-left {
  background: #282c34 !important;
}

.el-tabs__nav-wrap::after {
  background: #282c34 !important;
}

.el-tabs--left .el-tabs__header.is-left,
.el-tabs--left .el-tabs__header.is-right,
.el-tabs--left .el-tabs__nav-scroll,
.el-tabs--left .el-tabs__nav-wrap.is-left,
.el-tabs--left .el-tabs__nav-wrap.is-right,
.el-tabs--right .el-tabs__header.is-left,
.el-tabs--right .el-tabs__header.is-right,
.el-tabs--right .el-tabs__nav-scroll,
.el-tabs--right .el-tabs__nav-wrap.is-left,
.el-tabs--right .el-tabs__nav-wrap.is-right {
  height: 100%;
}

.ims-left-tabs
  .el-tabs__header.is-left
  .el-tabs__nav-wrap.is-left
  .el-tabs__nav-scroll {
  height: 100%;
  overflow-y: auto;
}

.el-tabs__active-bar.is-left {
  display: none;
  width: 2px;
  top: 0;
  bottom: auto;
}

.ims-left-tabs .el-tabs__item {
  height: auto;
  padding: 0;

  span {
    color: #fff;
  }
}
.ims-left-tabs .el-tabs--left .el-tabs__header.is-left {
  float: left;
  margin-bottom: 0;
  margin-right: 10px;
}

.el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 15px;
}

.el-tabs + .el-menu {
  left: 74px;
  width: 182px;
}

.ims-column-grid {
  width: 54px !important;
  height: 54px !important;
  border-radius: 5px;
}

.el-tabs .el-tabs__item.is-active .ims-column-grid {
  background: #1890ff !important;
  color: #fff;
}

.ims-column-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  line-height: 32px;

  .svg-icon {
    font-size: 16px;
    margin-top: 6px;
  }
}

.ims-column-grid-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
}
</style>
