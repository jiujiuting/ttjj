/**
 * 获取
 * @param {*} key
 * @returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}
/**
 * 设置
 * @param {*} key
 * @param {*} value
 */
export function setItem (key, value) {
  if (typeof value === 'object') { // 复杂数据类型
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
/**
 * 根据key删除其中一个
 * @param {*} key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
/**
 *  删除所有
 */
export function clearItem () {
  window.localStorage.clearItem()
}
