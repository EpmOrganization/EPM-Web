const date = (value, format) => {
  const StrDateToGMTFn = (StrDateToGMT) => {
    // eslint-disable-next-line
      if (StrDateToGMT && new Date(StrDateToGMT) != 'Invalid Date') {
      return new Date(StrDateToGMT)
    } else if (StrDateToGMT) {
      // eslint-disable-next-line
        if (new Date(date.replace(/-/g, '/')) != 'Invalid Date') {
        return new Date(date.replace(/-/g, '/'))
      }
    }
    return null
  }
  const getDoubleDigit = (num) => {
    num = '0' + num
    return num.slice(-2)
  }
  let GMTDate = StrDateToGMTFn(value)
  if (GMTDate) {
    GMTDate = {
      year: GMTDate.getFullYear(),
      month: getDoubleDigit(GMTDate.getMonth() + 1),
      day: getDoubleDigit(GMTDate.getDate()),
      hours: GMTDate.getHours() <= 9 ? '0' + GMTDate.getHours() : GMTDate.getHours(),
      minutes: GMTDate.getMinutes() <= 9 ? '0' + GMTDate.getMinutes() : GMTDate.getMinutes(),
      seconds: GMTDate.getSeconds() <= 9 ? '0' + GMTDate.getSeconds() : GMTDate.getSeconds()
    }
    return format.replace(/yyyy/, GMTDate.year).replace(/MM/, GMTDate.month).replace(/dd/, GMTDate.day).replace(/hh/, GMTDate.hours).replace(/mm/, GMTDate.minutes).replace(/ss/, GMTDate.seconds)
  }
  return value
}

const month = (originVal) => {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  return `${y}-${m}`
}

const valueBack = (value, arry, key, key2) => {
  let val = {}
  key = key || 'value'
  key2 = key2 || 'label'
  arry.map((item) => {
    if (item[key] === value) {
      val = item
    }
  })
  return val[key2]
}
export default {
  date,
  valueBack,
  month
}
