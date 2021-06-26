import React, { FunctionComponent } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { INodeApiHttpPostOrderResponse } from "../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http";
import CheckoutPageOrderButtonStripeForm from "./order-button-stripe-form.checkout.pages.templateOne.components";

export interface IPropsCheckoutPageOrderButtonStripe {
  createOrder(): Promise<INodeApiHttpPostOrderResponse>
  orderCanBePlaced: boolean
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutPageOrderButtonStripe: FunctionComponent<IPropsCheckoutPageOrderButtonStripe> = ({ createOrder, orderCanBePlaced }) => {

  return <Elements stripe={stripePromise}>
    <CheckoutPageOrderButtonStripeForm createOrder={createOrder} orderCanBePlaced={orderCanBePlaced} />
  </Elements>
}

export default CheckoutPageOrderButtonStripe
