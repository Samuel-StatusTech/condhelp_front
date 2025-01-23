export const cnpjValidator = (cnpj: string) => {
  cnpj = cnpj.replace(/\D/g, "")

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false

  const boldnessList = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  const firstDigit = verifyDigit(cnpj, 12, boldnessList)
  const secondDigit = verifyDigit(cnpj, 13, boldnessList)

  return firstDigit === +cnpj[12] && secondDigit === +cnpj[13]
}

const verifyDigit = (cnpj: string, base: number, boldnessList: number[]) => {
  let sum = 0
  for (let i = 0; i < base; i++) {
    sum += +cnpj[i] * boldnessList[boldnessList.length - base + i]
  }
  const rest = sum % 11
  return rest < 2 ? 0 : 11 - rest
}
