export const getInitials = (params: string | string[]) => {
  let str = ""

  if (Array.isArray(params)) {
    params.forEach((w) => (str += w[0].toUpperCase()))
  } else if (typeof params === "string") {
    const words = params.split(" ")
    words.forEach((w) => (str += w[0].toUpperCase()))
  }

  return str
}
