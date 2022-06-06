/*
 * @Author: mavon
 * @Date: 2021-12-28 14:01:27
 * @LastEditTime: 2022-06-02 22:50:21
 * @LastEditors: Please set LastEditors
 * @Description:
 */
let BASE_URL = ''
let TIME_OUT = 60000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://127.0.0.1:8002'
  TIME_OUT = 60000
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://ims.my-cloud.com/org/prod'
  TIME_OUT = 60000
} else {
  BASE_URL = 'http://ims.my-cloud.com/org/test'
  TIME_OUT = 60000
}

export { BASE_URL, TIME_OUT }
