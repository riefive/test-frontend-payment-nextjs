export function toCurrency(number: any) {
  if (!number) return 0
  const value = number.toString().replace(/\./g, '')
  return Number(value) > 0 ? value.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0
}
