import React, { FunctionComponent } from 'react';

import Router from 'next/router';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { INodeApiHttpPostOrderResponse, IOrderResponseStripe } from '../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http';
import { useAppDispatch } from '../../../../redux/hooks.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import CheckoutOrderAndPayButton from './checkout.order.button';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';

export interface IPropsCheckoutPageOrderButtonStripe {
  createOrder(): Promise<INodeApiHttpPostOrderResponse>;
  orderCanBePlaced: boolean;

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

  setOrderButtonLoading,
  buttonLoading,
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    amplitudeEvent(constructEventName(`order now stripe`, 'button'), {});

    setOrderButtonLoading(true);

    const response = (await createOrder()) as IOrderResponseStripe;

    setOrderButtonLoading(false);

    if (!response.result) {
      amplitudeEvent(constructEventName(`order now stripe createOrder error`, 'response'), response);

      return dispatch(
        updateError({
          severity: 'error',
          message: response.message,
          show: true,
        }),
      );
    }

    amplitudeEvent(constructEventName(`order now stripe createOrder success`, 'response'), response);

    Router.push(response.session.url);
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutOrderAndPayButton orderPlaceFunction={handleSubmit} orderButtonLoading={buttonLoading} orderCanBePlaced={orderCanBePlaced} />
    </Elements>
  );
};

export default CheckoutPageOrderButtonStripe;
