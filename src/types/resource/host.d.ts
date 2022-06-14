/*
 * @Author: Mavon
 * @Description:
 * @Date: 2022-06-13 17:50:23
 * @LastEditTime: 2022-06-13 17:57:17
 * @FilePath: /icloud-monitor-pro/src/types/resource/host.d.ts
 */
export interface Host {
  id: number
  assetNum: string
  cabinet: string
  ip: string
  machineRoom: string
  tags: string[]
  totalCpu: string
  totalMem: string
  usedMem: string
  usedCpu: string
}
