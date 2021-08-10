import React, { FormEvent, FunctionComponent } from 'react';
import { INodeApiHttpPostOrderResponse, IOrderResponseStripe } from '../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http';
import styled from 'styled-components';
import { useState } from 'react';
import LoadingIndicator from '../../common/loadingIndicator/loading-indicator.common.templateOne.components';
import { useTranslation } from 'next-i18next';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppDispatch } from '../../../../redux/hooks.redux';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import Router from 'next/router';
import { IShopAvailablity } from '../../../../interfaces/common/index.common.interfaces';

export interface IPropsCheckoutPageOrderButtonStripeForm {
  createOrder(): Promise<INodeApiHttpPostOrderResponse>;
  orderCanBePlaced: boolean;
  shop: IShopAvailablity;
}

const Form = styled.form`
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

const OrderButton = styled.div`
  font-size: 24px;
  font-weight: 700;
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(p) => p.theme.textDarkColor};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 16px;
  }
`;

const CheckoutPageOrderButtonStripeForm: FunctionComponent<IPropsCheckoutPageOrderButtonStripeForm> = ({ createOrder, orderCanBePlaced, shop }) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const { t } = useTranslation('page-checkout');
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();
    setButtonLoading(true);

    const response = (await createOrder()) as IOrderResponseStripe;

    setButtonLoading(false);

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
    <Form onSubmit={handleSubmit}>
      <SubmitButton type="submit" disabled={buttonDisabled}>
        {buttonLoading ? (
          <LoadingIndicator />
        ) : (
          <OrderButton>{!shop.availability && !shop.isClosed ? t('@pre-order-and-pay') : t('@order-and-pay')}</OrderButton>
        )}
      </SubmitButton>
    </Form>
  );
};

export default CheckoutPageOrderButtonStripeForm;
