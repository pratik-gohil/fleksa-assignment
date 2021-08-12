import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Router from 'next/router';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { INodeApiHttpPostOrderResponse, IOrderResponseStripe } from '../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http';
import { IShopAvailablity } from '../../../../interfaces/common/index.common.interfaces';
import { useAppDispatch } from '../../../../redux/hooks.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import CheckoutOrderAndPayButton from './checkout.order.button';

const Wrappper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  background-color: ${(props) => (props.disabled ? '#aaa' : props.theme.primaryColor)};
  cursor: pointer;
  border: ${(props) => props.theme.border};
  border-radius: 1000px;
`;

export interface IPropsCheckoutPageOrderButtonStripe {
  createOrder(): Promise<INodeApiHttpPostOrderResponse>;
  orderCanBePlaced: boolean;
  shop: IShopAvailablity;
  setOrderButtonLoading: React.Dispatch<React.SetStateAction<boolean>>;
  buttonLoading: boolean;
}

const stripeKey = process.env.NEXT_PUBLIC_REACT_APP_STRIPE_KEY;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
let stripePromise: Promise<Stripe | null>;
if (stripeKey) {
  stripePromise = loadStripe(stripeKey);
} else {
  throw new Error('Stripe key not found');
}

const CheckoutPageOrderButtonStripe: FunctionComponent<IPropsCheckoutPageOrderButtonStripe> = ({
  createOrder,
  orderCanBePlaced,
  shop,
  setOrderButtonLoading,
  buttonLoading,
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    setOrderButtonLoading(true);

    const response = (await createOrder()) as IOrderResponseStripe;

    setOrderButtonLoading(false);

    if (!response.result)
      return dispatch(
        updateError({
          severity: 'error',
          message: response.message,
          show: true,
        }),
      );

    Router.push(response.session.url);
  };

  const buttonDisabled = !orderCanBePlaced || buttonLoading;

  return (
    <Elements stripe={stripePromise}>
      <Wrappper>
        <SubmitButton type="submit" disabled={buttonDisabled}>
          <CheckoutOrderAndPayButton
            orderPlaceFunction={() => handleSubmit()}
            shop={shop}
            orderButtonLoading={buttonLoading}
            orderCanBePlaced={orderCanBePlaced}
          />
        </SubmitButton>
      </Wrappper>
    </Elements>
  );
};

export default CheckoutPageOrderButtonStripe;
