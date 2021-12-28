import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ImRequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorsCatch?: (error: any) => any
}

export interface ImRequestConfig extends AxiosRequestConfig {
  interceptors?: ImRequestInterceptors
  showLoading?: boolean
}
