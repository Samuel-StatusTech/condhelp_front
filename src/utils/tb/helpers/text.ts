export const capitalizeFirstLetter = (str: string) => {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const collapseText = (text: string) => {
  const words = text.split(/\s+/)
  if (words.length <= 2) {
    return text
  }
  return `${words.slice(0, 2).join(" ")}...`
}
