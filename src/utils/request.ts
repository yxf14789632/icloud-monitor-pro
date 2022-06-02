import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import localCache from '@/utils/cache'
import { ElMessage, ElMessageBox } from 'element-plus'
import { BASE_URL, TIME_OUT } from '../service/request/config'

// 创建 axios 实例
const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      )
    }
    const token = localCache.getCache('token')
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    if (code === '00000') {
      return response.data
    } else {
      // 响应数据为二进制流处理(Excel导出)
      if (response.data instanceof ArrayBuffer) {
        return response
      }

      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      })
      return Promise.reject(new Error(msg || 'Error'))
    }
  },
  (error) => {
    const { code, msg } = error.response.data
    if (code === 'A0230') {
      // token 过期
      localStorage.clear() // 清除浏览器全部缓存
      window.location.href = '/' // 跳转登录页
      ElMessageBox.alert('当前页面已失效，请重新登录', '提示', {})
    } else {
      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      })
    }
    return Promise.reject(new Error(msg || 'Error'))
  }
)

// 导出 axios 实例
export default service
