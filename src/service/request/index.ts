import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ImRequestInterceptors, ImRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

// 封装一个axios reques, 方便扩展和替换
class ImRequest {
  instance: AxiosInstance
  interceptors?: ImRequestInterceptors
  showLoading?: boolean
  loading?: LoadingInstance

  constructor(config: ImRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()
        return res.data
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  request(config: ImRequestConfig): void {
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }
    if (config.showLoading) {
      this.showLoading = config.showLoading
    }
    this.instance
      .request(config)
      .then((res) => {
        if (config.interceptors?.responseInterceptors) {
          res = config.interceptors.responseInterceptors(res)
        }
        this.showLoading = DEFAULT_LOADING
        console.log(res)
      })
      .catch((err) => {
        this.showLoading = DEFAULT_LOADING
        return err
      })
  }
}

export default ImRequest