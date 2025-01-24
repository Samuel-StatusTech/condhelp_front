export const getMajorityDate = () => {
  const d = new Date()

  const backThen = new Date(d.getFullYear() - 18, d.getMonth(), d.getDate())

  return backThen
}
