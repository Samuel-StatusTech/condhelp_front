export const sortAlphabetically = (list: any[], field: string) => {
  const sorted = list.sort((a, b) =>
    a[field].toLowerCase().localeCompare(b[field].toLowerCase())
  )

  console.log(list)
  console.log(sorted)
  console.log(field)

  return sorted
}
