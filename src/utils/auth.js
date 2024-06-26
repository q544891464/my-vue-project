/*
 * @Author: QinLin 18056937236@189.cn
 * @Date: 2023-02-02 17:02:33
 * @LastEditors: QinLin 18056937236@189.cn
 * @LastEditTime: 2023-06-19 11:51:04
 * @FilePath: \h5\src\utils\auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import Storage from 'vue-ls'
import env from '@/utils/env.js'

const storageOptions = {
  namespace: 'eqc_notice__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
}

// 创建 Vue 应用实例
const app = createApp({})

// 使用 vue-ls 插件
app.use(Storage, storageOptions)

import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'

export function getToken() {
  // eslint-disable-next-line
  return env.isLocal
    ? 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVUaW1lIjoxNjc5Mzg3NjI1Nzc3LCJhcHBUeXBlIjoyLCJ1c2VySWQiOiJiZWI3YjQ0MDU4ZGI0ZjRlYjJiMzkwZjQwNzk1NTIxMyIsImRldmljZUlkIjoiMTIzIn0.y9DKOD_yCikIxecfoQKmIifoRoMTsMMLIJg2sGqn_qY'
    : app.config.globalProperties.$ls.get(ACCESS_TOKEN)
}

// token的有效期为3个小时即可
export function setToken(token) {
  return app.config.globalProperties.$ls.set(ACCESS_TOKEN, token)
}

export function removeToken() {
  return app.config.globalProperties.$ls.remove(ACCESS_TOKEN)
}

export function getCacheUserInfo() {
  // eslint-disable-next-line
  // 开发改这里
  return env.isLocal
    ?  {"appId": "6610040000", "departmentId": "1001104", "departmentName": "燎原计划", "fontScale": 1, "headPhoto": "", "name": "陈维帆", "orgId": "1001", "phone": "18940000450", "showWatermark": true, "ticket": "ST-58-zHbG4OudOez2bs6Dl67Fdo1MrUwnrOBFhMc", "useId": "843c41b8d4ca4efa83d5dd605c1a4227"}
    : app.config.globalProperties.$ls.get(USER_INFO)
}

export function getCachExternalLinkInfo() {
  // eslint-disable-next-line
  return {
    isBrowserLink: false,
    isExternalLink: true // 移动端打开h5链接页面
  }
}

export function getOtherExternalLinkInfo() {
  // eslint-disable-next-line
  // 开发改这里
  return {
"appId": "6610040000", "departmentId": "1001104", "departmentName": "燎原计划", "fontScale": 1, "headPhoto": "", "name": "陈维帆", "orgId": "1001", "phone": "18940000450", "showWatermark": true, "ticket": "ST-58-zHbG4OudOez2bs6Dl67Fdo1MrUwnrOBFhMc", "useId": "843c41b8d4ca4efa83d5dd605c1a4227"
  }
}

export function setCacheUserInfo(userInfo) {
  return app.config.globalProperties.$ls.set(USER_INFO, userInfo)
}

export function removeCacheUserInfo() {
  return app.config.globalProperties.$ls.remove(USER_INFO)
}
