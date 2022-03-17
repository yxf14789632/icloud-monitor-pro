<template>
  <div class="ims-wrapper">
    <div class="ims-layout-column">
      <el-scrollbar class="ims-column-bar-container">
        <ims-logo></ims-logo>
        <ims-side-tabs></ims-side-tabs>
        <ims-menu></ims-menu>
      </el-scrollbar>

      <div class="ims-main ims-main-card">
        <div class="ims-layout-header fixed-header">
          <ims-nav></ims-nav>
          <div class="ims-tabs">
            <ims-nav-tabs></ims-nav-tabs>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-menu"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>关闭其他</el-dropdown-item>
                  <el-dropdown-item>关闭左侧</el-dropdown-item>
                  <el-dropdown-item>关闭右侧</el-dropdown-item>
                  <el-dropdown-item>关闭全部</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <div class="ims-app-main">
          <!-- 加载主要视图路由 -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ImsLogo from './ims-logo/index.vue'
import ImsSideTabs from './ims-side-tabs/index.vue'
import ImsNav from './ims-nav/index.vue'
import ImsNavTabs from './ims-nav-tabs/index.vue'
import { useStore } from '@/store/index'
import ImsMenu from './ims-menu/index.vue'
import { IVaiTab } from '@/service/login/type'
import { useRoute } from 'vue-router'

const store = useStore()
const userMenus = computed(() => store.state.login.userMenus)
const route = useRoute()
const { path, meta } = route

// 将首页添加到tabs
const tab: IVaiTab = {
  path: path,
  title: meta.title as string
}
store.commit('addTab', tab)

// 刚开始加载 设置第一个route
store.commit('setRoutes', userMenus.value[0].children)

store.commit('setActiveSideTab', {
  title: userMenus.value[0].meta.title,
  path: userMenus.value[0].path
})
</script>

<style lang="less">
.ims-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .ims-layout-column {
    padding-top: 110px;

    .ims-column-bar-container {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: 266px;
      height: 100vh;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

      .ri-home-2-line:before {
        content: '\ee19';
      }

      .el-tabs + .el-menu {
        left: 74px;
        width: 182px;
      }

      .el-menu .el-divider {
        margin: 0 0 20px 0;
        background-color: #f6f6f6;
      }

      .el-menu {
        border: 0;
      }
    }

    .ims-main {
      position: relative;
      width: auto;
      min-height: 100%;
      margin-left: 266px;
      .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1998;
        width: 100%;
      }
      .fixed-header {
        left: 266px;
        width: calc(100% - 266px);
      }

      .ims-layout-header {
        .ims-nav {
          position: relative;
          height: 60px;
          padding-right: 20px;
          padding-left: 20px;
          overflow: hidden;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          background: #fff;
          box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

          .left-panel {
            display: flex;
            align-items: center;
            justify-items: center;
            height: 60px;
          }

          .ims-breadcrumb-icon {
            display: inline-block;
            font-size: 16px;
            text-align: center;
            vertical-align: -3.5px;
          }

          .right-panel {
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: flex-end;
            height: 60px;

            > [class*='vai-icon-'] {
              margin-left: 20px;
              color: rgba(0, 0, 0, 0.65);
              cursor: pointer;
            }

            > [class*='vai-icon-'] {
              display: inline-block;
              font-size: 16px;
              text-align: center;
              vertical-align: -3.5px;
            }

            .avatar-dropdown {
              display: flex;
              align-content: center;
              align-items: center;
              justify-content: center;
              justify-items: center;

              .user-avatar {
                width: 40px;
                height: 40px;
                margin-left: 15px;
                cursor: pointer;
                border-radius: 50%;
              }

              .user-name {
                position: relative;
                display: flex;
                align-content: center;
                align-items: center;
                height: 40px;
                margin-left: 6px;
                line-height: 40px;
                cursor: pointer;
              }
            }
          }
        }

        .ims-tabs {
          position: relative;
          box-sizing: border-box;
          display: flex;
          align-content: center;
          align-items: center;
          justify-content: space-between;
          min-height: 50px;
          padding-right: 20px;
          padding-left: 20px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          background: #fff;
          border-top: 1px solid #f6f6f6;
        }
      }
      .ims-app-main {
        width: 100%;
        padding: 20px;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s,
          color 0.1s, font-size 0s;
      }
    }
  }
}
</style>
