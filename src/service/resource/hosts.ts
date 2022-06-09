import request from '@/utils/request'

export function listMachineWithPage(queryParams: any) {
  return request({
    url: '/api/v1/hosts',
    params: queryParams
  })
}
