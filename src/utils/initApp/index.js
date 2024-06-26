import './common'
import Vconsole from 'vconsole'

// 此文件添加的公共模块，可能依赖根实例，可能依赖外部参数，其他无依赖模块，可以放入common中

/**
 * 初始化vue根实例
 * @param Vue
 * @param options
 * @param options.App：app实例
 * @param options.busOptions 参见bus.js
 * @returns {*}
 */
export default async function(Vue, options = {}) {
  const env = Vue.prototype.$env
  const { App, ...vmOptions } = options
  // 通过render函数，根据环境动态添加class
  const rootClassObj = {
    'zdxlz-skin-white': env.skinWhite,
    'zdxlz-skin-black': env.skinBlack
  }

  const className = Object.keys(rootClassObj)
    .filter(key => rootClassObj[key])
    .join(' ')
  // body class
  document.body.className = [document.body.className, className].filter(_ => _).join(' ')
  const openVconsole = process.env.VUE_APP_BASE_ENV && process.env.VUE_APP_BASE_ENV === 'development'
  if (openVconsole) {
    const vConsole = new Vconsole()
    Vue.use(vConsole)
  }

  // 返回vue实例
  vmOptions.render = h => h(App)
  const vm = new Vue(vmOptions).$mount('#app')

  return vm
}
