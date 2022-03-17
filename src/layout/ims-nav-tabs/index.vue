<template>
  <el-tabs
    class="ims-tabs-content ims-tabs-content-smooth"
    v-model="activeTab"
    @tab-click="clickBtn"
    type="card"
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
      :closable="item.path !== '/main'"
    ></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from '@/store/index'
import { useRoute, useRouter } from 'vue-router'
import { IUserMenusResult, IVaiTab } from '@/service/login/type'
import localCache from '@/utils/cache'

const route = useRoute()
const router = useRouter()
const store = useStore()

const tabList = computed(() => {
  return store.getters['getTabs']
})

const activeTab = ref('')
const setActiveTab = () => {
  activeTab.value = route.path
}

const addTab = () => {
  const { path, meta } = route
  const tab: IVaiTab = {
    path: path,
    title: meta.title as string
  }
  store.commit('addTab', tab)
}

watch(
  () => route.path,
  () => {
    setActiveTab()
    // 将当前路由添加到选项卡
    addTab()
  }
)

const beforeRefresh = () => {
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('tabsView', JSON.stringify(tabList.value))
  })
  let tabSession = sessionStorage.getItem('tabsView')
  if (tabSession) {
    let oldTabs = JSON.parse(tabSession)
    if (oldTabs.length > 0) {
      store.state.tabList = oldTabs
    }
  }
}

onMounted(() => {
  beforeRefresh()
  setActiveTab()
  // 将当前路由添加到选项卡
  addTab()
  setActiveRoutes()
})

const removeTab = (targetName: string) => {
  console.log(targetName)
  if (targetName === '/main') return
  const tabs = tabList.value
  let activeName = activeTab.value

  if (activeName === targetName) {
    tabs.forEach((tab: IVaiTab, index: number) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }

  activeTab.value = activeName
  store.state.tabList = tabs.filter((tab: IVaiTab) => tab.path !== targetName)
  router.push({ path: activeName })
}

const setActiveRoutes = () => {
  const route = useRoute()
  // 获取路由所在的sideTab和tab 选中对应的tab
  const menuList = localCache.getCache('userMenus')
  menuList.forEach((item: IUserMenusResult) => {
    if (item.children && item.children.length > 0) {
      if (queryMenuContainsPath(item, route.path, []).length > 0) {
        const routeList = item.children
        const activeSideTab: IVaiTab = {
          title: item.meta.title,
          path: item.path
        }
        store.commit('setActiveSideTab', activeSideTab)
        store.commit('setRoutes', routeList)
        return
      }
    }
  })
}

const clickBtn = (tab: any) => {
  const { props } = tab
  // 跳转路由
  router.push({ path: props.name })
  // 获取路由所在的sideTab和tab 选中对应的tab
  const menuList = localCache.getCache('userMenus')
  menuList.forEach((item: IUserMenusResult) => {
    if (item.children && item.children.length > 0) {
      if (queryMenuContainsPath(item, props.name, []).length > 0) {
        const routeList = item.children
        const activeSideTab: IVaiTab = {
          title: item.meta.title,
          path: item.path
        }
        console.log(activeSideTab)
        store.commit('setActiveSideTab', activeSideTab)
        store.commit('setRoutes', routeList)
        return
      }
    }
  })
}

/**
    递归判断目录中是否包含path
 */
function queryMenuContainsPath(
  vaiMenu: IUserMenusResult,
  path: string,
  result: string[]
) {
  if (vaiMenu.children && vaiMenu.children.length > 0) {
    let children = vaiMenu.children
    children.forEach((child: IUserMenusResult) => {
      if (child.path === path) {
        result.push(child.path)
        return false
      }
      if (child.children && child.children.length > 0) {
        return queryMenuContainsPath(child, path, result)
      }
    })
  }
  return result
}
</script>

<style lang="less">
.ims-tabs-content-smooth {
  height: 38px;
}
.ims-tabs-content {
  width: calc(100% - 40px);
}
.ims-tabs-content-smooth .el-tabs__header {
  border-bottom: 0 !important;
}

.ims-tabs-content-smooth .el-tabs__header .el-tabs__item,
.ims-tabs-content-smooth .el-tabs--card > .el-tabs__header .el-tabs__item {
  height: 38px;
  padding: 0 30px 0 30px !important;
  margin-top: 5.95px;
  margin-right: -18px;
  line-height: 38px;
  text-align: center;
  border: 0 !important;
  outline: none;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
}

.ims-tabs-content-smooth .el-tabs__header .el-tabs__item.is-active:hover {
  color: #1890ff !important;
  background: #e8f4ff !important;
}

.ims-tabs-content-smooth .el-tabs__header .el-tabs__item.is-active,
.ims-tabs-content-smooth .el-tabs__header .el-tabs__item.is-active:hover {
  color: #1890ff;
  background: #e8f4ff;
}

.ims-tabs-content-smooth .el-tabs__item {
  color: #626b7d;
}
.ims-tabs-content-smooth .el-tabs__header .el-tabs__item.is-active,
.ims-tabs-content-smooth .el-tabs__header .el-tabs__item.is-active:hover,
.ims-tabs-content-smooth .el-tabs__header .el-tabs__item:hover {
  padding: 0 30px 0 30px;
  -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
  mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.ims-tabs-content .el-tabs__header .el-tabs__nav {
  border: 0 !important;
}

.ims-tabs-content-smooth .el-tabs__header .el-tabs__item:hover {
  color: #515a6e;
  background: #dee1e6;
}

.ims-tabs-content-smooth
  .el-tabs--card
  > .el-tabs__header
  .el-tabs__item
  .el-icon-close {
  position: relative;
  font-size: 12px;
  width: 0;
  height: 14px;
  vertical-align: middle;
  line-height: 15px;
  overflow: hidden;
  top: -1px;
  right: -2px;
  transform-origin: 100% 50%;
}

.ims-tabs-content-smooth
  .el-tabs--card
  > .el-tabs__header
  .el-tabs__item.is-closable:hover
  .el-icon-close {
  width: 14px;
}
</style>

function setActiveSideTab(activeSideTab: IVaiTab) { throw new Error('Function
not implemented.') }
