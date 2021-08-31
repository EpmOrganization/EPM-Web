
const sessionStorage = {
  get(str) {
    if (!window.localStorage) return null
    const item = window.localStorage.getItem(str)
    try {
      return JSON.parse(item)
    } catch (error) {
      return item
    }
  },
  set(str, data) {
    if (!window.localStorage) return null
    if (typeof data !== 'object') {
      window.localStorage.setItem(str, data)
    } else {
      window.localStorage.setItem(str, JSON.stringify(data))
    }
  },
  setItem(key, value) {
    value = JSON.stringify(value)
    window.localStorage.setItem(key, value)
  },
  getItem(key, defaultValue) {
    let value = window.localStorage.getItem(key)
    try {
      value = JSON.parse(value)
    } catch { () => {} }
    return value || defaultValue
  },
  del(str) {
    if (!window.localStorage) return null
    window.localStorage.removeItem(str)
  },
  clear() {
    window.localStorage.clear()
  }
}
export default sessionStorage
