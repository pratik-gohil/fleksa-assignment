import React, { FunctionComponent } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { INodeApiHttpPostOrderResponse } from "../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http";
import CheckoutPageOrderButtonStripeForm from "./order-button-stripe-form.checkout.pages.templateOne.components";

export interface IPropsCheckoutPageOrderButtonStripe {
  createOrder(): Promise<INodeApiHttpPostOrderResponse>
  orderCanBePlaced: boolean
  onPaymentDone(): Promise<void>
}

const stripeKey = process.env.NEXT_PUBLIC_REACT_APP_STRIPE_KEY

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
let stripePromise: Promise<Stripe|null>
if (stripeKey) {
  stripePromise = loadStripe(stripeKey);
} else {
  throw new Error("Stripe key not found")
}

const CheckoutPageOrderButtonStripe: FunctionComponent<IPropsCheckoutPageOrderButtonStripe> = ({ onPaymentDone, createOrder, orderCanBePlaced }) => {

  return <Elements stripe={stripePromise}>
    <CheckoutPageOrderButtonStripeForm onPaymentDone={onPaymentDone} createOrder={createOrder} orderCanBePlaced={orderCanBePlaced} />
  </Elements>
}

export default CheckoutPageOrderButtonStripe
