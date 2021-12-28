import localCache from '@/utils/cache'
import loginModule from '@/store/login/login'
import ImRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const imRequest = new ImRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorsCatch: (err) => {
      return err
    },
    responseInterceptors: (res) => {
      return res
    },
    responseInterceptorsCatch: (err) => {
      return err
    }
  }
})
export default imRequest
