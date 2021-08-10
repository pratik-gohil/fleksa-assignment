import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import React, { FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-grid-system';

import styled from 'styled-components';
import NodeApiHttpPostOrder from '../../../../http/nodeapi/order/post.order.nodeapi.http';
import { IMakeOrderProducts } from '../../../../interfaces/http/nodeapi/order/post.order.nodeapi.http';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCart } from '../../../../redux/slices/cart.slices.redux';
import {
  selectPaymentMethod,
  updatePaymentMethod,
  ICheckoutPaymentMethods,
  selectTip,
  selectComment,
  selectOrderType,
  ICheckoutOrderTypes,
  selectWantAt,
  selectSelectedAddressId,
  selectPromoCode,
  selectDeliveryFinances,
} from '../../../../redux/slices/checkout.slices.redux';
import { selectConfiguration, selectLanguageCode, selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import { selectShop } from '../../../../redux/slices/index.slices.redux';
import { selectBearerToken, selectCustomer } from '../../../../redux/slices/user.slices.redux';
import { getPrductsFromCartData } from '../../../../utils/products.utils';
import LoadingIndicator from '../../common/loadingIndicator/loading-indicator.common.templateOne.components';
import { StyledCheckoutCard, StyledCheckoutTitle } from './customer-info.checkout.pages.templateOne.components';
import CheckoutPageOrderButtonPaypal from './order-button-paypal.checkout.pages.templateOne.components';
import CheckoutPageOrderButtonStripe from './order-button-stripe.checkout.pages.templateOne.components';

// import SvgCash from '../../../../public/assets/svg/cash.svg';
// import SvgCard from '../../../../public/assets/svg/card.svg';
// import SvgPaypal from '../../../../public/assets/svg/paypal.svg';

import { useTranslation } from 'next-i18next';
import { updateError } from '../../../../redux/slices/common.slices.redux';

const PaymentMethodList = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0 -${(props) => props.theme.dimen.X4}px;
`;

const PaymentMethodItems = styled.li<{ isActive: boolean }>`
  display: flex;
  flex: 1;
  margin: ${(props) => props.theme.dimen.X4}px;
  padding: ${(props) => props.theme.dimen.X4}px;
  border: ${(props) => props.theme.border};
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius}px;

  border-color: ${(p) => (p.isActive ? p.theme.primaryColor : 'none')};
  box-shadow: ${(p) => (p.isActive ? '0 0 4px 0 rgba(0, 0, 0, 0.2)' : '0 0 4px 0 transparent')};

  cursor: pointer;

  img {
    display: block;
    height: 40px;
  }
`;

const Disclaimer = styled.p`
  margin: 0;
  padding: ${(props) => props.theme.dimen.X4}px 0;
  text-align: center;
  color: #aaa;
  font-size: 12px;
`;

const OrderButtonContainer = styled.div`
  margin-top: ${(props) => props.theme.dimen.X4}px;
`;

const OrderButtonCashContainer = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  background-color: ${(props) => (props.active ? props.theme.primaryColor : '#aaa')};
  cursor: pointer;
  border: ${(props) => props.theme.border};
  border-radius: 1000px;
`;

const PaymentIconImage = styled.img``;

const OrderButton = styled.div`
  font-size: clamp(16px, 24px, 3vw);
  font-weight: 700;
`;

const CheckoutPagePayment: FunctionComponent = ({}) => {
  const router = useRouter();
  const [orderButtonLoading, setOrderButtonLoading] = useState(false);
  const [orderCanBePlaced, setOrderCanBePlaced] = useState(false);
  const deliveryFinances = useAppSelector(selectDeliveryFinances);
  const paymentMethodData = useAppSelector(selectPaymentMethod);
  const addressId = useAppSelector(selectSelectedAddressId);
  const shopMenuId = useAppSelector(selectSelectedMenu);
  const configuration = useAppSelector(selectConfiguration);
  const bearerToken = useAppSelector(selectBearerToken);
  const customerData = useAppSelector(selectCustomer);
  const promoCode = useAppSelector(selectPromoCode);
  const orderType = useAppSelector(selectOrderType);
  const wantAtData = useAppSelector(selectWantAt);
  const comment = useAppSelector(selectComment);
  const shopData = useAppSelector(selectShop);
  const cartData = useAppSelector(selectCart);
  const tipData = useAppSelector(selectTip);
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector(selectLanguageCode);
  const { t } = useTranslation('page-checkout');
  const [currentMode, setCurrentMode] = useState(paymentMethodData);

  async function createOrder() {
    try {
      const products: Array<IMakeOrderProducts> = getPrductsFromCartData(cartData);

      const response = await new NodeApiHttpPostOrder(configuration, bearerToken as any).post({
        order: {
          shop_id: shopMenuId as number,
          name: customerData.name,
          email: customerData.email as any,
          phone: customerData.phone as any,
          country_code: customerData.country_code as any,
          is_delivery: orderType === 'DELIVERY',
          customer_address_id: addressId || undefined,
          want_at: moment(`${wantAtData?.date.value as string} ${wantAtData?.time.value as string}`).toString(),
          products,
          payment_method: paymentMethodData,
          tip: tipData ? tipData : undefined,
          offer: {
            is_applicable: !!promoCode && promoCode.token.length > 0,
            token: promoCode?.token || '',
          },
          description: comment,
          order_type: orderType as ICheckoutOrderTypes,
        },
      });
      if (!response.result) {
        dispatch(
          updateError({
            show: true,
            message: response.message,
            severity: 'error',
          }),
        );
        throw new Error(response.message);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  function isEmailValid(mail: string) {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(mail);
  }

  function isOrderPossible() {
    if (orderType === 'DELIVERY') {
      return deliveryFinances && deliveryFinances.amount ? cartData.cartCost >= deliveryFinances.amount : false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    setCurrentMode(paymentMethodData);
  }, [paymentMethodData]);

  // TODO: Control orderButton active state
  useEffect(() => {
    console.log('paymentMethodData ; ', paymentMethodData);
    const canPlace = !!(
      bearerToken &&
      shopData?.id &&
      customerData.name &&
      customerData.name.length &&
      customerData.email &&
      isEmailValid(customerData.email) &&
      customerData.phone &&
      customerData.country_code &&
      wantAtData &&
      isOrderPossible()
    );

    setOrderCanBePlaced(canPlace);
  }, [bearerToken, shopData?.id, customerData.name, customerData.email, customerData.phone, customerData.country_code, wantAtData, deliveryFinances]);

  async function onPaymentDone() {
    router.push(`/${languageCode}/order-placed`);
  }

  async function onClickCashOrderButton() {
    try {
      if (orderButtonLoading || !orderCanBePlaced) return;
      setOrderButtonLoading(true);
      await createOrder();
      await onPaymentDone();
    } catch (error) {
      console.error(error);
    } finally {
      setOrderButtonLoading(false);
    }
  }

  let paymentTitle: string | undefined = undefined;
  let orderButton;
  switch (paymentMethodData) {
    case 'CASH':
      orderButton = (
        <OrderButtonCashContainer onClick={onClickCashOrderButton} active={orderCanBePlaced}>
          {orderButtonLoading ? <LoadingIndicator /> : <OrderButton>{t('@order-and-pay')}</OrderButton>}
        </OrderButtonCashContainer>
      );
      paymentTitle = paymentMethodData;
      break;
    case 'STRIPE':
      orderButton = <CheckoutPageOrderButtonStripe createOrder={createOrder} orderCanBePlaced={orderCanBePlaced} />;
      paymentTitle = t('@credit-card');
      break;
    case 'PAYPAL':
      orderButton = <CheckoutPageOrderButtonPaypal onPaymentDone={onPaymentDone} createOrder={createOrder} orderCanBePlaced={orderCanBePlaced} />;
      paymentTitle = paymentMethodData;
      break;
    default:
      break;
  }

  return (
    <StyledCheckoutCard style={{ marginBottom: 48 }}>
      <StyledCheckoutTitle>
        {t('@payment')} {paymentTitle ? `(${paymentTitle})` : ''}
      </StyledCheckoutTitle>
      <Row>
        <Col xs={12}>
          <PaymentMethodList>
            {[
              {
                method: 'CASH' as ICheckoutPaymentMethods,
                img: <PaymentIconImage src="/assets/svg/cash.svg" alt="cash" />,
                show: true,
              },
              {
                method: 'STRIPE' as ICheckoutPaymentMethods,
                img: <PaymentIconImage src="/assets/png/stripe.png" alt="stripe" />,
                show: shopData?.stripe_available,
              },
              {
                method: 'PAYPAL' as ICheckoutPaymentMethods,
                img: <PaymentIconImage src="/assets/svg/paypal.svg" alt="paypal" />,
                show: shopData?.paypal_available,
              },
            ].map((item) => {
              return (
                item.show && (
                  <PaymentMethodItems
                    isActive={currentMode === item.method}
                    key={item.method}
                    onClick={() => dispatch(updatePaymentMethod(item.method))}
                  >
                    {item.img}
                  </PaymentMethodItems>
                )
              );
            })}
          </PaymentMethodList>
        </Col>

        <Col xs={12}>
          <OrderButtonContainer>{orderButton}</OrderButtonContainer>
        </Col>
        <Col xs={12}>
          <Disclaimer>
            {t('@agreement-part-1')} <span style={{ textTransform: 'uppercase', fontWeight: 'bolder', color: '#333' }}>{t('@order-and-pay')}</span>{' '}
            {t('@agreement-part-2')}{' '}
            <a href="/privacy-policy" style={{ textDecoration: 'underline', color: '#333' }}>
              {' '}
              {t('@policy')}
            </a>{' '}
            {t('@and')}{' '}
            <a href="/terms" style={{ textDecoration: 'underline', color: '#333' }}>
              {t('@terms')}
            </a>
          </Disclaimer>
        </Col>
      </Row>
    </StyledCheckoutCard>
  );
};

export default CheckoutPagePayment;
