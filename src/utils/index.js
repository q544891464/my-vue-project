/**
 *
 * @param {Array} array 传入tree数组
 * @returns 返回处理过的list数组
 */
export function tree2List(array) {
  const result = []
  const childrenFn = (sourse) => {
    sourse.map(el => {
      result.push(el)
      el.children && el.children.length > 0 ? childrenFn(el.children) : ''
    })
  }
  childrenFn(array)
  return result
}

/**
 *
 * @param {Array} array 传入list数组
 * @returns 返回处理过的tree数组
 */
export function list2Tree(list) {
  const data = JSON.parse(JSON.stringify(list)) // 浅拷贝不改变源数据
  const result = []
  if (!Array.isArray(data)) {
    console.log('不是数组')
    return result
  }
  data.forEach(item => {
    delete item.children
  })
  const map = {}
  data.forEach(item => {
    map[item.id] = item
  })
  data.forEach(item => {
    if (item.id === item.pId || item.id === item.parentId) {
      item.pId = '-1'
      item.parentId = '-1'
    }
    item.label = item.name || item.departmentName
    const parent = map[item.pId || item.parentId]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 *
 * @param {Array} array 传入需要扁平化的数组
 * @param {Number} deep 传入扁平深度，缺省则为任意深度
 * @returns 返回扁平化后的数组
 */
export function flattenArrays(array, deep = Infinity) {
  return array.flat(deep)
}

/**
 *
 * @param {any} data 传入需要深克隆的数据（支持多层嵌套深克隆）
 * @returns 返回深克隆过后的数据
 */
export function deepClone(data) {
  if (data instanceof Function) {
    return data
  } else if (data instanceof Array) {
    const array = []
    data.map(el => array.push(deepClone(el)))
    return array
  } else if (data instanceof Object) {
    const object = {}
    for (const key in data) object[key] = deepClone(data[key])
    return object
  } else return data
}

export const getHalfHourIntervals = (startTime, endTime) => {
  const preDateStr = '2021/09/01 '
  startTime = preDateStr + startTime
  endTime = preDateStr + endTime
  const intervals = []
  const current = new Date(startTime)
  endTime = new Date(endTime)
  // eslint-disable-next-line no-unmodified-loop-condition
  while (current <= endTime) {
    if (current.getMinutes() === 0 || current.getMinutes() === 30) {
      const timeString = current.getHours().toString().padStart(2, '0') + ':' +
        current.getMinutes().toString().padStart(2, '0')
      intervals.push(timeString)
    }
    current.setMinutes(current.getMinutes() + 30)
  }
  return intervals
}

export const getDefaultMeetingTimes = () => {
  const list = [

    { startTime: '00:00', endTime: '00:30', timeIndex: 1 },
    { startTime: '00:30', endTime: '01:00', timeIndex: 2 },
    { startTime: '01:00', endTime: '01:30', timeIndex: 3 },
    { startTime: '01:30', endTime: '02:00', timeIndex: 4 },
    { startTime: '02:00', endTime: '02:30', timeIndex: 5 },
    { startTime: '02:30', endTime: '03:00', timeIndex: 6 },
    { startTime: '03:00', endTime: '03:30', timeIndex: 7 },
    { startTime: '03:30', endTime: '04:00', timeIndex: 8 },
    { startTime: '04:00', endTime: '04:30', timeIndex: 9 },
    { startTime: '04:30', endTime: '05:00', timeIndex: 10 },
    { startTime: '05:00', endTime: '05:30', timeIndex: 11 },
    { startTime: '05:30', endTime: '06:00', timeIndex: 12 },
    { startTime: '06:00', endTime: '06:30', timeIndex: 13 },
    { startTime: '06:30', endTime: '07:00', timeIndex: 14 },
    { startTime: '07:00', endTime: '07:30', timeIndex: 15 },
    { startTime: '07:30', endTime: '08:00', timeIndex: 16 },
    { startTime: '08:00', endTime: '08:30', timeIndex: 17 },
    { startTime: '08:30', endTime: '09:00', timeIndex: 18 },
    { startTime: '09:00', endTime: '09:30', timeIndex: 19 },
    { startTime: '09:30', endTime: '10:00', timeIndex: 20 },
    { startTime: '10:00', endTime: '10:30', timeIndex: 21 },
    { startTime: '10:30', endTime: '11:00', timeIndex: 22 },
    { startTime: '11:00', endTime: '11:30', timeIndex: 23 },
    { startTime: '11:30', endTime: '12:00', timeIndex: 24 },
    { startTime: '12:00', endTime: '12:30', timeIndex: 25 },
    { startTime: '12:30', endTime: '13:00', timeIndex: 26 },
    { startTime: '13:00', endTime: '13:30', timeIndex: 27 },
    { startTime: '13:30', endTime: '14:00', timeIndex: 28 },
    { startTime: '14:00', endTime: '14:30', timeIndex: 29 },
    { startTime: '14:30', endTime: '15:00', timeIndex: 30 },
    { startTime: '15:00', endTime: '15:30', timeIndex: 31 },
    { startTime: '15:30', endTime: '16:00', timeIndex: 32 },
    { startTime: '16:00', endTime: '16:30', timeIndex: 33 },
    { startTime: '16:30', endTime: '17:00', timeIndex: 34 },
    { startTime: '17:00', endTime: '17:30', timeIndex: 35 },
    { startTime: '17:30', endTime: '18:00', timeIndex: 36 },
    { startTime: '18:00', endTime: '18:30', timeIndex: 37 },
    { startTime: '18:30', endTime: '19:00', timeIndex: 38 },
    { startTime: '19:00', endTime: '19:30', timeIndex: 39 },
    { startTime: '19:30', endTime: '20:00', timeIndex: 40 },
    { startTime: '20:00', endTime: '20:30', timeIndex: 41 },
    { startTime: '20:30', endTime: '21:00', timeIndex: 42 },
    { startTime: '21:00', endTime: '21:30', timeIndex: 43 },
    { startTime: '21:30', endTime: '22:00', timeIndex: 44 },
    { startTime: '22:00', endTime: '22:30', timeIndex: 45 },
    { startTime: '22:30', endTime: '23:00', timeIndex: 46 },
    { startTime: '23:00', endTime: '23:30', timeIndex: 47 },
    { startTime: '23:30', endTime: '23:59', timeIndex: 48 }

  ]
  return list
}

export const isJsonString = str => {
  try {
    const toObj = JSON.parse(str) // json字符串转对象
    /*
        判断条件 1. 排除null可能性
        2. 确保数据是对象或数组
    */
    if (toObj && typeof toObj === 'object') {
      return true
    }
  } catch {
    return false
  }
  return false
}
export const getDefaultMeetingStartTimes = () => {
  const list = ['全部时间', '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']
  return list
}

export const getDefaultMeetingEndTimes = () => {
  const list = ['全部时间', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '23:59']
  return list
}

export const formatDate = (objDate, fmt) => {
  var o = {
    'M+': objDate.getMonth() + 1, // 月份
    'd+': objDate.getDate(), // 日
    'h+': objDate.getHours() % 12 === 0 ? 12 : objDate.getHours() % 12, // 小时
    'H+': objDate.getHours(), // 小时
    'm+': objDate.getMinutes(), // 分
    's+': objDate.getSeconds(), // 秒
    'q+': Math.floor((objDate.getMonth() + 3) / 3), // 季度
    'S': objDate.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (objDate.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}
