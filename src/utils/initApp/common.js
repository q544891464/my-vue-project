/*
 * @Author: QinLin 18056937236@189.cn
 * @Date: 2023-03-01 09:41:20
 * @LastEditors: QinLin 18056937236@189.cn
 * @LastEditTime: 2023-04-14 14:35:10
 * @FilePath: \h5\src\utils\initApp\common.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 */
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import store from '@/store'
import { install } from 'vs-tree'
import 'vs-tree/dist/vs-tree.css'
import env from '@/utils/env.js'
import '@/styles/index.scss'
import '@/styles/global.scss'
import JSBridge from '@/utils/js-bridge'
Vue.prototype.$JSBridge = JSBridge
Vue.prototype.IOSData = {}
Vue.prototype.$env = env // env内的是静态数据
window.receiveMessage = function(msg) {
  Vue.prototype.IOSData[msg.guid] = msg.data
  if (msg.guid === '123') {
    console.log(msg.data, 'msg.datamsg.datamsg.data')
    store.dispatch('user/setUserInfo', msg.data)
  }
  // if (msg.guid === '111') {
  //   store.dispatch('user/SET_TOKEN', msg.data)
  // }
}

function setContact(string) {
  console.log('传过来的人', JSON.stringify(string))
  if (string) {
    if (window.androidMethod) {
      store.dispatch('user/setUserList', string)
    } else {
      store.dispatch('user/setUserList', string.data)
    }
  }
}

window.setContact = setContact

Vue.use(Vant)
Vue.config.productionTip = false
Vue.use(install)
