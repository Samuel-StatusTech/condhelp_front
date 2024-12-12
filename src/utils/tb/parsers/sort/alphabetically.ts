export const sortAlphabetically = (list: any[], field: string) => {
  const sorted = list.sort((a, b) =>
    a[field].toLowerCase().localeCompare(b[field].toLowerCase())
  )

  return sorted
}
