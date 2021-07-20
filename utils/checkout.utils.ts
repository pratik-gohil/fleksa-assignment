export function checkoutFinalAmount(cartTotal: number, tip: number|null, discount: number = 0, delivery: number = 0) {
  return cartTotal + (tip || 0) - discount + delivery
}