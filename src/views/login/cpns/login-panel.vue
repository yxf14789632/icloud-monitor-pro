<template>
  <div class="im-login-content">
    <div class="im-login-background">
      <svg-icon
        name="backgound"
        color="#FFFFFF"
        :width="600"
        :height="400"
      ></svg-icon>
    </div>
    <div class="im-login-form">
      <h2>智能监控系统</h2>
      <login-account ref="accountRef"></login-account>

      <div class="im-login-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary" :underline="false">忘记密码</el-link>
      </div>

      <div class="im-login-btn-control">
        <el-button class="im-login-btn" type="primary" @click="handleLoginClick"
          >立即登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import SvgIcon from '@/components/SvgIcon.vue'

export default defineComponent({
  components: {
    LoginAccount,
    SvgIcon
  },
  setup() {
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()

    const handleLoginClick = () => {
      accountRef.value?.loginAction(isKeepPassword.value)
    }

    return {
      isKeepPassword,
      handleLoginClick,
      accountRef
    }
  }
})
</script>

<style>
.im-login-content {
  position: absolute;
  width: 1170px;
  height: 400px;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: flex;
}
.im-login-background {
  /* background: url('../../../assets/img/backgound.svg') no-repeat; */
  width: 600px;
  height: 400px;
  display: flex;
}
.im-login-form {
  max-width: 400px;
  width: 23%;
  width: 500px;
  height: 240px;
  margin-left: 150px;
  text-align: center;
  padding: 60px 0 100px 0;
}

.im-login-form h2 {
  margin-left: 60px;
}

.im-login-control {
  display: flex;
  justify-content: space-between;
  margin: 0 30px 0 90px;
}

.im-login-btn-control {
  margin: 10px 30px 0 90px;
}
.im-login-btn {
  width: 100%;
}
</style>
