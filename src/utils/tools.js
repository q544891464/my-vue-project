/*
 * @Author: QinLin 18056937236@189.cn
 * @Date: 2023-02-17 22:12:27
 * @LastEditors: QinLin 18056937236@189.cn
 * @LastEditTime: 2023-03-21 13:44:20
 * @FilePath: \h5\src\utils\tools.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import env from '@/utils/env.js'

// 获取地址栏参数
export const getUrlParam = name => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const loc = window.location.search
  const r = loc.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
// 获取系统主题的参数，没有则从链接上获取(开发时放在链接上)
export const getSkinValue = (key, useUrlParam = true) => {
  const urlParamValue = getUrlParam(key)
  if (useUrlParam && urlParamValue) {
    return urlParamValue
  }
  let value = 0
  if (window.androidMethod && window.androidMethod.getSkinType) {
    value = window.androidMethod.getSkinType()
  }
  return value
}

export const openLink = (url) => {
  if (env.isAndroid) { // android终端
    window.open(url)
  } else { // ios终端
    window.location.href = url
  }
}
