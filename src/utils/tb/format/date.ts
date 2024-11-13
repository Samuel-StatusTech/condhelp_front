export const getTime = (date: string | Date, withSeconds?: boolean) => {
  let str = ""

  const d = new Date(date)

  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")

  str = `${hours}:${minutes}`

  if (withSeconds) str += `:${String(d.getSeconds()).padStart(2, "0")}`

  return str
}

export const getDateStr = (date: string | Date, format: "dmy" | "pureDate") => {
  let str = ""

  switch (format) {
    case "dmy":
      str = getDMY(date)
      break
    case "pureDate":
      str = getPureDateStr(date as Date)
      break
    default:
      break
  }

  return str
}

const getDMY = (date: string | Date) => {
  let str = ""
  const d = new Date(date)

  str = String(d.getDate()).padStart(2, "0")
  str += `/${String(d.getMonth() + 1).padStart(2, "0")}`
  str += `/${String(d.getFullYear())}`

  return str
}

const getPureDateStr = (date: Date) => {
  let str = ""

  str = String(date.getDate()).padStart(2, "0")
  str += `/${String(date.getMonth() + 1).padStart(2, "0")}`
  str += `/${String(date.getFullYear())}`

  return str
}
