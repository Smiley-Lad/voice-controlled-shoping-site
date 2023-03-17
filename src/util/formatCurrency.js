const formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "INR"
})

export default function formatCurrency(amount) {
  return formatter.format(amount)
}
