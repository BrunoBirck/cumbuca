export function formatMoney(value: number): string {
  const integerPart = Math.floor(value)
  let decimalPart = Math.round((value - integerPart) * 100).toString()
  if (decimalPart.length === 1) {
    decimalPart = '0' + decimalPart
  }
  const integerPartString = integerPart
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `R$ ${integerPartString},${decimalPart}`
}
