import localCache from '@/utils/cache'
import ImRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const imRequest = new ImRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
