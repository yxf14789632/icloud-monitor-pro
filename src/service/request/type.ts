import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ImRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (error: any) => any
}

export interface ImRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ImRequestInterceptors<T>
  showLoading?: boolean
}
