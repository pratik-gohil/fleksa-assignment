import React, { FormEvent, FunctionComponent } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { INodeApiHttpPostOrderResponse } from "../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http";
import styled from "styled-components";

export interface IPropsCheckoutPageOrderButtonStripeForm {
  createOrder(): Promise<INodeApiHttpPostOrderResponse>
  orderCanBePlaced: boolean
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const CardElementContainer = styled.div`
  border: ${props => props.theme.border};
  padding: ${props => props.theme.dimen.X4*2}px ${props => props.theme.dimen.X4}px;
  border-radius: ${props => props.theme.borderRadius}px;
  margin-bottom: ${props => props.theme.dimen.X4*2}px;
`

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  background-color: ${props => props.disabled? "#aaa": props.theme.primaryColor};
  cursor: pointer;
  border: ${props => props.theme.border};
  border-radius: 1000px;
`

const OrderButton = styled.div`
  font-size: 24px;
  font-weight: 700;
  font-family: ${props => props.theme.fontFamily};
`

const CheckoutPageOrderButtonStripeForm: FunctionComponent<IPropsCheckoutPageOrderButtonStripeForm> = ({ orderCanBePlaced }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return // to supress type error
    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  const buttonDisabled = !stripe || !orderCanBePlaced

  return <Form onSubmit={handleSubmit}>
    <CardElementContainer>
      <CardElement
        options={{
          hidePostalCode: true,
          style: {
            base: {
              fontSize: '16px',
              color: '#000',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#f44336',
              backgroundColor: "#fff"
            },
          },
        }}
      />
    </CardElementContainer>
    <SubmitButton type="submit" disabled={buttonDisabled}>
      <OrderButton>ORDER AND PAY</OrderButton>
    </SubmitButton>
  </Form>
}

export default CheckoutPageOrderButtonStripeForm
