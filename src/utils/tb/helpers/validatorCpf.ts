export const cpfValidator = (cpf: string) => {
  cpf = cpf.replace(/\D/g, "")

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false
  }

  const firstDigit = verifyDigit(cpf, 10)
  const secondDigit = verifyDigit(cpf, 11)

  return firstDigit === parseInt(cpf[9]) && secondDigit === parseInt(cpf[10])
}

function verifyDigit(cpf: string, initialBoldness: number) {
  let sum = 0
  for (let i = 0; i < initialBoldness - 1; i++) {
    sum += parseInt(cpf[i]) * (initialBoldness - i)
  }
  const rest = sum % 11
  return rest < 2 ? 0 : 11 - rest
}
