<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input
          class="login-user"
          v-model="account.username"
          placeholder="请输入用户名"
          clearable
        >
          <template #prefix>
            <el-icon class="el-input__icon"><user /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          show-password
          class="login-password"
          v-model="account.password"
          placeholder="请输入密码"
          clearable
        >
          <template #prefix>
            <el-icon class="el-input__icon"><lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import rules from '../config/account-config'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      username: localCache.getCache('username') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 判断是否需要记住密码
          if (isKeepPassword) {
            localCache.setCache('username', account.username)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('username')
            localCache.deleteCache('password')
          }
          // 开始登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style>
.login-account .el-form-item__content .el-form-item__error {
  margin-left: 30px;
}
.login-user,
.login-password {
  width: 280px;
}
</style>
