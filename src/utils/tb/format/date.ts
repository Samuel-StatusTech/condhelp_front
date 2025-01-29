export const getTime = (date: string | Date, withSeconds?: boolean) => {
  let str = ""

  const d = new Date(date)

  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")

  str = `${hours}:${minutes}`

  if (withSeconds) str += `:${String(d.getSeconds()).padStart(2, "0")}`

  return str
}

export const getDateStr = (
  date: string | Date | number,
  format:
    | "dmy"
    | "usa"
    | "pureDate"
    | "time"
    | "javaTime"
    | "javaDateTime"
    | "iso"
    | "localDate"
    | "localTime"
    | "localTimeStr_DMY"
    | "localTimeStr_HM",
  removeSeconds?: boolean
) => {
  let str = ""

  switch (format) {
    case "dmy":
      str = getDMY(date)
      break
    case "usa":
      str = getUsa(date)
      break
    case "pureDate":
      str = getPureDateStr(date as Date)
      break
    case "time":
      str = getTimeStr(new Date(date))
      break
    case "javaTime":
      str = getJavaTimeStr(new Date(date))
      break
    case "javaDateTime":
      str = getJavaDateTimeStr(new Date(date))
      break
    case "iso":
      str = getIsoDateStr(new Date(date))
      break
    case "localDate":
      str = getLocalDateStr(new Date(date))
      break
    case "localTime":
      str = getLocalTimeStr(new Date(date), removeSeconds)
      break
    case "localTimeStr_DMY":
      str = getLocalTimeStr_DMY(date as string)
      break
    case "localTimeStr_HM":
      str = getLocalTimeStr_HM(date as string)
      break
    default:
      break
  }

  return str
}

const getDMY = (date: string | Date | number) => {
  let str = ""
  const d = new Date(date)

  str = String(d.getDate()).padStart(2, "0")
  str += `/${String(d.getMonth() + 1).padStart(2, "0")}`
  str += `/${String(d.getFullYear())}`

  return str
}

const getUsa = (date: string | Date | number) => {
  let str = ""
  const d = new Date(date)

  str = `${String(d.getFullYear())}`
  str += `-${String(d.getMonth() + 1).padStart(2, "0")}`
  str += `-${String(d.getDate()).padStart(2, "0")}`

  return str
}

const getPureDateStr = (date: Date) => {
  let str = ""

  str = String(date.getDate()).padStart(2, "0")
  str += `/${String(date.getMonth() + 1).padStart(2, "0")}`
  str += `/${String(date.getFullYear())}`

  return str
}

const getTimeStr = (date: Date) => {
  let str = ""

  str = String(date.getHours()).padStart(2, "0")
  str += `:${String(date.getMinutes()).padStart(2, "0")}`

  return str
}

const getJavaTimeStr = (date: Date) => {
  let str = ""
  const iso = date.toISOString()

  str = iso.slice(0, iso.length - 1)

  return str
}

const getJavaDateTimeStr = (date: Date) => {
  let str = ""

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  const hour = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  str = `${day}-${month}-${year} ${hour}:${minutes}:${seconds}`

  return str
}

const getIsoDateStr = (date: Date) => {
  let str = date.toISOString()

  return str
}

const getLocalDateStr = (date: Date) => {
  let str = date.toLocaleDateString()

  return str
}

const getLocalTimeStr = (date: Date, removeSeconds?: boolean) => {
  let str = date.toLocaleTimeString()

  if (removeSeconds) str = str.slice(0, 5)

  return str
}

const getLocalTimeStr_DMY = (date: string) => {
  const utcDate = new Date(date)

  const timezoneOffset = utcDate.getTimezoneOffset()

  const localDate = new Date(utcDate.getTime() - timezoneOffset * 60 * 1000)
  const str = localDate.toLocaleDateString()

  return str
}

const getLocalTimeStr_HM = (date: string) => {
  const utcDate = new Date(date)

  const timezoneOffset = utcDate.getTimezoneOffset()

  const localDate = new Date(utcDate.getTime() - timezoneOffset * 60 * 1000)
  const str = localDate.toLocaleTimeString().slice(0, 5)

  return str
}
