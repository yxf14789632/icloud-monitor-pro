import ImRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const imRequest = new ImRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      const token = '123test'
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      console.log('请求成功拦截')
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log('请求失败拦截')
      return err
    },
    responseInterceptors: (res) => {
      console.log('响应成功拦截')
      return res
    },
    responseInterceptorsCatch: (err) => {
      console.log('响应失败拦截')
      return err
    }
  }
})
export default imRequest
