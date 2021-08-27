import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { FunctionComponent } from 'react';
import NodeApiHttpPostPaypal from '../../../../http/nodeapi/paypal/post.paypal.nodeapi.http';
import { INodeApiHttpPostOrderResponse, IOrderResponsePaypal } from '../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectConfiguration } from '../../../../redux/slices/configuration.slices.redux';
import { selectBearerToken } from '../../../../redux/slices/user.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';

export interface IPropsCheckoutPageOrderButtonPaypal {
  createOrder(): Promise<INodeApiHttpPostOrderResponse>;
  orderCanBePlaced: boolean;
  onPaymentDone(): Promise<void>;
}

const CheckoutPageOrderButtonPaypal: FunctionComponent<IPropsCheckoutPageOrderButtonPaypal> = ({
  onPaymentDone,
  createOrder,
  orderCanBePlaced,
}) => {
  const bearerToken = useAppSelector(selectBearerToken);
  const configuration = useAppSelector(selectConfiguration);

  // useEffect(() => {

  // }, []);

  return (
    <PayPalButtons
      fundingSource="paypal"
      style={{
        label: 'pay',
        shape: 'pill',
        color: 'black',
        layout: 'vertical',
        tagline: false,
      }}
      disabled={!orderCanBePlaced}
      createOrder={async () => {
        amplitudeEvent(constructEventName(`order now paypal`, 'button'), {});

        const response = (await createOrder()) as IOrderResponsePaypal;

        console.log('create order response ', response);

        if (!response.result) {
          amplitudeEvent(constructEventName(`order now paypal createOrder error`, 'response'), response);
          return '';
        }

        amplitudeEvent(constructEventName(`order now paypal createOrder success`, 'response'), response);

        return response.paypal_order_id;
      }}
      onApprove={async (data) => {
        amplitudeEvent(constructEventName(`order now paypal onApprove`, 'action'), data);

        if (bearerToken) {
          const response = await new NodeApiHttpPostPaypal(configuration, bearerToken).postOrderSuccess({
            paypalOrderId: data.orderID,
          });

          if (!response.result) {
            amplitudeEvent(constructEventName(`order now paypal confirmation response error`, 'response'), response);
            return;
          }

          amplitudeEvent(constructEventName(`order now paypal confirmation response success`, 'response'), response);

          await onPaymentDone();
        }
      }}
    />
  );
};

export default CheckoutPageOrderButtonPaypal;
