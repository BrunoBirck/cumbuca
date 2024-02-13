export const isValidCpf = (cpf: string) => {
  cpf = cpf.replace(/\D/g, '')

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let rest = (sum * 10) % 11
  let checkDigitOne = rest === 10 || rest === 11 ? 0 : rest

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  rest = (sum * 10) % 11
  let checkDigitTwo = rest === 10 || rest === 11 ? 0 : rest

  return (
    checkDigitOne === parseInt(cpf.charAt(9)) &&
    checkDigitTwo === parseInt(cpf.charAt(10))
  )
}

export const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}
