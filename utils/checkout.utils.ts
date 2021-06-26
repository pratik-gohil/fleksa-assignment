export function checkoutFinalAmount(cartTotal: number, tip: number|null) {
  return cartTotal + (tip || 0)
}