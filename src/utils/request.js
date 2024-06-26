import axios from 'axios'
import store from '@/store'
import { getCacheUserInfo } from '@/utils/auth'
import { Toast, Dialog } from 'vant'
import env from '@/utils/env.js'

// create an axios instance
const service = axios.create({
  baseURL: env.isLocal ? process.env.VUE_APP_BASE_PROXY_API : process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: process.env.VUE_APP_BASE_PROXY_API, // url = base url + request url

  // baseURL: env.isLocal ? process.env.VUE_APP_BASE_PROXY_API : process.env.VUE_APP_BASE_PROXY_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 120000 // request timeout
})
// const upload = axios.create({ // 上传文件服务器
//   baseURL: process.env.UPLOAD_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout
// })
const requestList = []// 这个是什么作用
const CancelToken = axios.CancelToken

// request interceptor 拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.cancelToken = new CancelToken((cancel) => {
      console.log('config.url', config.url)
      const requestFlag = JSON.stringify(config.url) + JSON.stringify(config.data) + '&' + config.method
      if (requestList.includes(requestFlag)) { // 请求标记已经存在，则取消本次请求，否则在请求列表中加入请求标记
        cancel('重复的请求')// 取消本次请求
      } else {
        requestList.push(requestFlag)
      }
    })
    const userInfo = getCacheUserInfo()
    console.log('*************************', userInfo)
    if (userInfo) {
      // config.headers['X-Cas-AppId'] = userInfo.appId
      config.headers['X-Cas-LoginId'] = userInfo.phone
      config.headers['X-Cas-Ticket'] = userInfo.ticket
      config.headers['Y-Access-Token'] = userInfo.ticket
    }
    config.headers['X-Cas-AppId'] = '6610040000'

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const requestFlag = JSON.stringify(response.config.url) + JSON.stringify(response.config.data) + '&' + response.config.method
    console.log('requestFlag', requestFlag)
    requestList.splice(requestList.findIndex(item => item === requestFlag), 1)
    const res = response.data
    console.log('接收不到响应吗')

    console.log(response)

    // return res.result ? res.result : res
    // if the custom code is not 20000, it is judged as an error.

    // 如果返回的code值等于200，则放行，如果不是200，则拦截集中处理

    if (res.code && (res.code + '') !== '200' && res.code !== 14008 && res.code !== 14001) {
      // if (response.status === 200) {
      //   return res
      // }
      console.log('res', res)
      Toast.fail(`${res.message || res.msg || 'Error'}`)

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        Dialog.confirm({
          title: 'Confirm logout',
          message: 'You have been logged out, you can cancel to stay on this page, or log in again',
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel'
        }).then(() => {
          store.dispatch('user/resetLoginData').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(res)
    } else {
      return res.result ? res.result : res
    }
  },
  error => {
    requestList.length = 0
    console.log('err' + error) // for debug
    if (error.message !== '重复的请求') {
      Toast.fail(error.message)
      return Promise.reject(error)
    }
  }
)

export default service

