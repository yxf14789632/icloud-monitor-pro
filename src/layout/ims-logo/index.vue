<template>
  <div class="logo-container logo-container-column">
    <div class="router-link-active">
      <span class="logo">
        <svg
          t="1636598845397"
          class="icon ims-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3204"
          width="32"
          height="32"
        >
          <path
            d="M1024.512 701.44c-2.56 5.12-5.632 10.24-7.68 15.872-19.968 53.248-64 86.016-120.832 86.528-256 0.512-511.488 0.512-767.488 0-56.832 0-100.864-33.28-120.832-86.528-2.048-5.632-5.12-10.24-7.68-15.872v-496.64c21.504-66.048 64.512-104.96 136.704-104.96 250.368 0 500.736-0.512 751.104 0 68.608 0 107.52 29.696 132.096 95.744 1.024 3.072 3.072 6.144 4.608 9.216v496.64z m-511.488-537.6h-371.2c-56.832 0-77.312 20.48-77.824 76.8-0.512 140.8-0.512 281.6 0 421.888 0 56.832 20.48 76.8 77.312 76.8h741.888c55.808 0 76.288-20.48 76.288-75.776 0.512-141.312 0.512-283.136 0-424.448 0-54.784-21.504-75.776-76.288-75.776-122.88 0.512-246.272 0.512-370.176 0.512zM193.536 993.792v-60.928h190.464v-62.976h255.488v60.928h191.488v62.976h-637.44z"
            fill="#ffffff"
            p-id="3205"
          />
          <path
            d="M574.464 675.328h-123.904v-381.952h123.904v381.952zM830.976 421.376v252.416h-124.416v-252.416h124.416zM318.464 675.328H195.072v-189.44h123.392v189.44z"
            fill="#ffffff"
            p-id="3206"
          />
        </svg>
      </span>
      <span class="title">IMS Pro</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.ims-column-bar-container {
  .logo-container-column {
    background: #fff !important;
  }
  .logo-container-column {
    position: relative;
    overflow: hidden;
    background: transparent;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .logo {
    position: fixed;
    top: 0;
    display: block;
    width: 64px;
    height: 60px;
    margin: 0;
    background: linear-gradient(90deg, #282c34, #000);
    .ims-icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      color: #fff;
      vertical-align: middle;
    }
  }

  .logo-container-column .title {
    padding-right: 15px;
    padding-left: 15px;
    margin-left: 64px !important;
    color: #515a6e !important;
    background: #fff !important;
    display: inline-block;
    margin-left: 5px;
    overflow: hidden;
    font-size: 20px;
    line-height: 55px;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
}
</style>
