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
import { selectBearerToken, selectCustomer, selectIsUserLoggedIn } from '../../../../redux/slices/user.slices.redux';
import { getPrductsFromCartData } from '../../../../utils/products.utils';
import { StyledCheckoutCard, StyledCheckoutTitle } from './customer-info.checkout.pages.templateOne.components';
import CheckoutPageOrderButtonPaypal from './order-button-paypal.checkout.pages.templateOne.components';
import CheckoutPageOrderButtonStripe from './order-button-stripe.checkout.pages.templateOne.components';

import { useTranslation } from 'next-i18next';
import { updateError } from '../../../../redux/slices/common.slices.redux';
import CheckoutOrderAndPayButton from './checkout.order.button';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { isEmailValid } from '../../../../utils/checkout.utils';

const PaymentMethodList = styled.div`
  display: flex;
  margin: 0 -${(props) => props.theme.dimen.X4}px;
`;

const PaymentMethodItems = styled.button<{ isActive: boolean }>`
  display: flex;
  flex: 1;
  margin: 0 ${(props) => props.theme.dimen.X4}px;
  padding: ${(props) => props.theme.dimen.X4}px;
  border: ${(props) => props.theme.border};
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius}px;
  background: transparent;
  height: 100px;

  border-color: ${(p) => (p.isActive ? p.theme.primaryColor : 'none')};
  box-shadow: ${(p) => (p.isActive ? '0 0 4px 0 rgba(0, 0, 0, 0.2)' : '0 0 4px 0 transparent')};

  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    /* margin: 0 0.5rem; */
    padding: 0;
    border: none;
    box-shadow: none;
    border-color: none;
    height: max-content;
    align-items: center;

    img {
      border: ${(props) => props.theme.border};
      box-shadow: ${(p) => (p.isActive ? '0 0 4px 0 rgba(0, 0, 0, 0.2)' : '0 0 4px 0 transparent')};
      border-color: ${(p) => (p.isActive ? p.theme.primaryColor : 'none')};
      /* padding: 0.5rem; */
    }
  }
`;

const Disclaimer = styled.p`
  margin: 0;
  padding: ${(props) => props.theme.dimen.X4}px 0;
  text-align: center;
  color: #aaa;
  font-size: 12px;
`;

const OrderButtonTopLevelContainer = styled.div`
  margin-top: ${(props) => props.theme.dimen.X4}px;
`;

const PaymentIconImage = styled.img``;

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
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const { t } = useTranslation('page-checkout');
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState('CASH');

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

  function isOrderPossible() {
    if (orderType === 'DELIVERY') {
      return deliveryFinances && deliveryFinances.amount ? cartData.cartCost >= deliveryFinances.amount : false;
    } else {
      return true;
    }
  }

  // TODO: Set initial payment method
  useEffect(() => {
    setCurrentPaymentMethod(paymentMethodData);
    dispatch(updatePaymentMethod(paymentMethodData));
  }, [paymentMethodData]);

  // TODO: Control orderButton active state
  useEffect(() => {
    const canPlace = !!(
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

  let paymentTitle = paymentMethodData; // /? Default title
  let orderButton = (
    <CheckoutOrderAndPayButton
      orderButtonLoading={orderButtonLoading}
      orderCanBePlaced={orderCanBePlaced}
      orderPlaceFunction={onClickCashOrderButton}
    />
  ); // ? Default payent method CASH

  switch (paymentMethodData) {
    case 'STRIPE':
      orderButton = (
        <CheckoutPageOrderButtonStripe
          createOrder={createOrder}
          orderCanBePlaced={orderCanBePlaced}
          setOrderButtonLoading={setOrderButtonLoading}
          buttonLoading={orderButtonLoading}
        />
      );
      paymentTitle = t('@credit-card');
      break;
    case 'PAYPAL':
      orderButton = isLoggedIn ? (
        <CheckoutPageOrderButtonPaypal onPaymentDone={onPaymentDone} createOrder={createOrder} orderCanBePlaced={orderCanBePlaced} />
      ) : (
        orderButton
      );
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
                method: 'STRIPE' as ICheckoutPaymentMethods,
                img: <PaymentIconImage src="/assets/svg/checkout/stripe.svg" alt="stripe" />,
                show: shopData?.stripe_available,
              },
              {
                method: 'PAYPAL' as ICheckoutPaymentMethods,
                img: <PaymentIconImage src="/assets/svg/checkout/paypal.svg" alt="paypal" />,
                show: shopData?.paypal_available,
              },
              {
                method: 'CASH' as ICheckoutPaymentMethods,
                img: <PaymentIconImage src="/assets/svg/checkout/cash.svg" alt="cash" />,
                show: true,
              },
            ].map((item) => {
              return (
                item.show && (
                  <PaymentMethodItems
                    isActive={currentPaymentMethod === item.method}
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
          <OrderButtonTopLevelContainer>{orderButton}</OrderButtonTopLevelContainer>
        </Col>

        {!!isLoggedIn && (
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
        )}
      </Row>
    </StyledCheckoutCard>
  );
};

export default CheckoutPagePayment;
