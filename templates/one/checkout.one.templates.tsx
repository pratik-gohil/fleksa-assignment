import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { FunctionComponent } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';

import CheckoutPageCart from '../../components/templateOne/pages/checkout/cart.checkout.pages.templateOne.components';
import CheckoutPageComments from '../../components/templateOne/pages/checkout/comments.checkout.pages.templateOne.components';
import CheckoutPageCustomerInfo from '../../components/templateOne/pages/checkout/customer-info.checkout.pages.templateOne.components';
import CheckoutPagePayment from '../../components/templateOne/pages/checkout/payment.checkout.pages.templateOne.components';
import CheckoutPageSummary from '../../components/templateOne/pages/checkout/summary.checkout.pages.templateOne.components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.redux';
import { selectPaymentMethod, updatePaymentMethod } from '../../redux/slices/checkout.slices.redux';
import { selectShop } from '../../redux/slices/index.slices.redux';

const CartContainerLarge = styled.div`
  display: none;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`;

const CartContainerSmall = styled.div`
  display: block;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`;

const CheckoutPageTemplateOne: FunctionComponent = ({}) => {
  const dispatch = useAppDispatch();

  const paymentMethod = useAppSelector(selectPaymentMethod);
  const shopData = useAppSelector(selectShop);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ((paymentMethod === 'PAYPAL' && !shopData?.paypal_available) || (paymentMethod === 'STRIPE' && !shopData?.stripe_available))
        dispatch(updatePaymentMethod('CASH')); // ? Default method on checkout
    }
  }, []);

  return (
    <PayPalScriptProvider
      options={{
        debug: false,
        'client-id': process.env.NEXT_PUBLIC_REACT_APP_PAYPAL_KEY as string,
        currency: 'EUR',
      }}
    >
      <Container>
        <Row>
          <Col lg={7}>
            <CartContainerSmall>
              <CheckoutPageCart />
            </CartContainerSmall>
            <CheckoutPageCustomerInfo />
            <CheckoutPageSummary />
            <CheckoutPageComments />
            <CheckoutPagePayment />
          </Col>
          <Col lg={5}>
            <CartContainerLarge>
              <CheckoutPageCart />
            </CartContainerLarge>
          </Col>
        </Row>
      </Container>
    </PayPalScriptProvider>
  );
};

export default CheckoutPageTemplateOne;
