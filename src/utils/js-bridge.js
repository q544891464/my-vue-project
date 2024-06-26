import env from './env'
import store from '@/store'
import { getCacheUserInfo, getCachExternalLinkInfo, getOtherExternalLinkInfo } from '@/utils/auth'
import { Toast } from 'vant'

const JSBridge = {
  origin: '', // 日后放scheme
  /**
     * 安卓重构后调用app方法
     * @param event：事件名称
     * @param data：json数据
     * @param success：成功回调
     * @param fail：失败回调
     * @returns {Promise<object>}
     */
  callAppByCall(event, data = {}, success, fail) {
    const _this = this
    // 设置回调方法
    const callbackKey = Date.now() + '' + Math.floor(Math.random() * 100000)
    const successName = `s${callbackKey}`
    const failName = `f${callbackKey}`
    const registerFn = (successFn, failFn) => {
      window[successName] = function(data) {
        const dataVal = data ? data.data : null
        successFn(dataVal)
        _this.unregisterFn(successName)
      }
      window[failName] = function(err) {
        failFn(err)
        _this.unregisterFn(failName)
      }
    }
    // 调用Native
    const triggerNative = () => {
      // 触发安卓方法
      if (env.isAndroid) { // 待和安卓沟通
        data = JSON.stringify({ command: event, params: data, bridgeCallback: successName })
        console.log(window.androidMethod, window.androidMethod.sendCommand, 'sendCommand')
        if (typeof window.androidMethod.sendCommand === 'function' || window.androidMethod.sendCommand !== undefined) {
          window.androidMethod.sendCommand(data)
        } else {
          Toast('请升级至最新版本查看此内容')
        }
      }

      // 触发ios方法
      if (env.isIos) {
        const params = {
          api: event,
          successName: successName,
          failName: failName,
          data: data
        }
        console.log('params----', params)
        window.iOSMethodBridge.postMessage(JSON.stringify(params))
      }
    }
    // 传入success则回调，否者返回promise
    if (typeof success === 'function') {
      if (!env.isApp) {
        return
      }
      registerFn(success, fail)
      triggerNative()
    } else {
      return new Promise((resolve, reject) => {
        if (!env.isApp) {
          resolve()
          return
        }
        registerFn(resolve, reject)
        triggerNative()
      })
    }
  },
  /**
     * 调用app方法
     * @param event：事件名称
     * @param data：json数据
     * @param success：成功回调
     * @param fail：失败回调
     * @returns {Promise<object>}
     */
  callApp(event, data = {}, success, fail) {
    const _this = this
    // 设置回调方法
    const callbackKey = Date.now() + '' + Math.floor(Math.random() * 100000)
    const successName = `s${callbackKey}`
    const failName = `f${callbackKey}`
    const registerFn = (successFn, failFn) => {
      window[successName] = function(data) {
        const dataVal = data ? data.data : null
        successFn(dataVal)
        _this.unregisterFn(successName)
      }
      window[failName] = function(err) {
        failFn(err)
        _this.unregisterFn(failName)
      }
    }
    // 调用Native
    const triggerNative = () => {
      // 触发安卓方法
      if (env.isAndroid) { // 待和安卓沟通
        console.log(window.androidMethod, window.androidMethod[event], window.androidMethod.uploadLog, window.androidMethod.meetingScanCode, 'window.androidMethod')
        data = JSON.stringify(Object.assign(data, success ? { successName: successName } : {}))
        if (typeof window.androidMethod[event] === 'function' || window.androidMethod[event] !== undefined) {
          window.androidMethod[event](data)
        } else {
          Toast('请升级至最新版本查看此内容')
        }
      }

      // 触发ios方法
      if (env.isIos) {
        const params = {
          api: event,
          successName: successName,
          failName: failName,
          data: data
        }
        console.log('params----', params)
        window.iOSMethodBridge.postMessage(JSON.stringify(params))
      }
    }
    // 传入success则回调，否者返回promise
    if (typeof success === 'function') {
      if (!env.isApp) {
        return
      }
      registerFn(success, fail)
      triggerNative()
    } else {
      return new Promise((resolve, reject) => {
        if (!env.isApp) {
          resolve()
          return
        }
        registerFn(resolve, reject)
        triggerNative()
      })
    }
  },

  /**
     * 注册app调用的方法
     * @param fnName
     * @param fn
     */
  registerFn(fnName, fn) {
    if (typeof fnName !== 'string') {
      throw TypeError('Illegal fnName: Not an string')
    }
    if (typeof fn !== 'function') {
      throw TypeError('Illegal fn: Not an function')
    }

    window[fnName] = function(data) {
      if (env.isIos) {
        fn(data)
      }
      if (env.isAndroid) {
        data = data || '{}'
        fn(JSON.parse(data))
      }
    }
  },

  /**
     * 注销app调用方法
     * @param fnName
     */
  unregisterFn(fnName) {
    if (typeof fnName !== 'string') {
      throw TypeError('Illegal fnName: Not an string')
    }

    delete window[fnName]
  },

  async getLoginUserInfo() {
    if (env.isAccessibleLocation) { // 白名单页面，供三端打开使用的H5页面
      return getCacheUserInfo() ? getCacheUserInfo() : {}
    }
    if (env.isAndroid) {
      if (window.androidMethod === undefined && env.isExternalLink) { // 安卓手机浏览器打开的需要特定处理的h5页面
        store.dispatch('user/setUserInfo', getCachExternalLinkInfo())
        return getCachExternalLinkInfo() ? getCachExternalLinkInfo() : {}
      }
      const userInfo = await window.androidMethod.jsGetUserBean()
      store.dispatch('user/setUserInfo', JSON.parse(userInfo))
      return { ...JSON.parse(userInfo) }
    }
    if (env.isIos) {
      if (window.iOSMethodBridge === undefined && env.isExternalLink) { // IOS手机浏览器打开的需要特定处理的h5页面
        store.dispatch('user/setUserInfo', getCachExternalLinkInfo())
        return getCachExternalLinkInfo() ? getCachExternalLinkInfo() : {}
      }
      const userInfo = await this.callApp('getLoginUserInfo')
      const { theme } = userInfo
      env.theme = theme
      if (env.theme === 'system') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        env.skinType = mediaQuery.matches ? 'black' : 'white'
        mediaQuery.addListener(() => location.reload())
      } else {
        env.skinType = env.theme === 'dark' ? 'black' : 'white'
      }
      store.dispatch('user/setUserInfo', userInfo)
      return { ...userInfo }
    }
    if (env.isExternalLink) { // 电脑端浏览器打开的需要特定处理的h5页面
      store.dispatch('user/setUserInfo', getCachExternalLinkInfo())
      return getCachExternalLinkInfo() ? getCachExternalLinkInfo() : {}
    }
    store.dispatch('user/setUserInfo', getOtherExternalLinkInfo())
    return getOtherExternalLinkInfo() ? getOtherExternalLinkInfo() : {}
  }
}

export default JSBridge
