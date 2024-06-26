/*
 * @Author: QinLin 18056937236@189.cn
 * @Date: 2023-02-17 22:12:27
 * @LastEditors: QinLin 18056937236@189.cn
 * @LastEditTime: 2023-04-20 20:34:54
 * @FilePath: \h5\src\utils\watermark.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: QinLin 18056937236@189.cn
 * @Date: 2023-02-17 22:12:27
 * @LastEditors: QinLin 18056937236@189.cn
 * @LastEditTime: 2023-03-21 16:17:06
 * @FilePath: \h5\src\utils\watermark.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { postAction } from '@/api/manage.js'
import store from '@/store/index.js'
const setWatermark = (str1, str2, color, visibility) => {
  const id = '1.23452384164.123412415'

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  const can = document.createElement('canvas')
  const str = str1 + str2
  const width = str.length ? 15 * str.length + 40 : 200
  const rowHeight = width * 0.36
  // 设置canvas画布大小
  can.width = width
  can.height = width * 0.36

  const cans = can.getContext('2d')
  cans.rotate(-20 * Math.PI / 180) // 水印旋转角度
  cans.font = '14px Vedana'
  cans.fillStyle = color || '#666666'
  cans.textAlign = 'center'
  cans.textBaseline = 'Middle'
  cans.fillText(str1 + str2 || '', width / 2, can.height) // 水印在画布的位置x，y轴

  const parent = document.createElement('div')
  parent.id = id
  parent.style.pointerEvents = 'none'
  parent.style.top = '0px'
  parent.style.left = '0px'
  parent.style.opacity = visibility || '0.15'
  parent.style.position = 'fixed'
  parent.style.zIndex = '100000'
  parent.style.overflow = 'hidden'
  parent.style.width = document.documentElement.clientWidth + 'px'
  parent.style.height = document.documentElement.clientHeight + 'px'
  const rows = Math.ceil(document.documentElement.clientHeight / rowHeight) || 0
  for (var i = 0; i < rows; i++) {
    const x = Math.floor(Math.random() * 71) + 10
    const child = document.createElement('div')
    child.style.width = document.documentElement.clientWidth + x + 'px'
    child.style.height = rowHeight + 'px'
    child.style.marginTop = 20 + 'px'
    child.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    const traslateX = x // 10 - 80 随机数
    child.style.transform = `translate(${i % 2 === 0 ? traslateX : -traslateX}px)`
    parent.appendChild(child)
  }
  document.body.appendChild(parent)
  return id
}

// 添加水印方法
export const setWaterMark = (str1, str2, color, visibility) => {
  let id = setWatermark(str1, str2, color, visibility)
  if (document.getElementById(id) === null) {
    id = setWatermark(str1, str2, color, visibility)
  }
}

// 移除水印方法
export const removeWatermark = () => {
  const id = '1.23452384164.123412415'
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }
}

export const addTobodyWaterMark = (color = '', show = false) => {
  postAction('/manage/getWatermarkConfig', {
    orgId: store.state.user.userInfo.orgId,
    type: 1
  }).then(res => {
    if (res.data.openFlag === 1 || show) {
      const str1 = store.state.user.userInfo.name || ''
      switch (res.data.watermarkMode) {
        case 1: setWaterMark(str1, store.state.user.userInfo.phone.substr(-4), color, res.data.visibility / 100); break
        case 2: setWaterMark(str1, store.state.user.userInfo.phone, color, res.data.visibility / 100); break
        case 3: setWaterMark(str1 + '-', store.state.user.userInfo.departmentName, color, res.data.visibility / 100); break
      }
    } else {
      removeWatermark()
    }
  })
}
