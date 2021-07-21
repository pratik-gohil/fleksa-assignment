export default function formatCurrency(amount: number, languageCode: string) {
  const amountString =  amount.toLocaleString(languageCode, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })
  return `€${amountString}`
}