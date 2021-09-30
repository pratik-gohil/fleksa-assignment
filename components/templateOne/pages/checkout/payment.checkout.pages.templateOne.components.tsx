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
  selectCheckoutLogin,
  updateCheckoutLogin,
  selectIsPreOrder,
  selectIsSofort,
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
import CheckoutLoginDropdown from './checkout.login.dropdown';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';

import SvgCashIcon from '../../../../public/assets/svg/checkout/v1/cash-icon.svg';
import SvgCashHoverIcon from '../../../../public/assets/svg/checkout/v1/cash-icon-hover.svg';

import SvgPaypalIcon from '../../../../public/assets/svg/checkout/v1/paypal-icon.svg';
import SvgPaypalHoverIcon from '../../../../public/assets/svg/checkout/v1/paypal-icon-hover.svg';

const Wrapper = styled.div`
  margin-bottom: 48px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-bottom: 0;
  }
`;

const PaymentMethodList = styled.div`
  display: flex;
  padding-top: 1rem;
  align-items: center;
`;

const PaymentMethodItems = styled.button<{ isActive: boolean }>`
  display: flex;
  flex: 1;
  margin: 0;

  justify-content: space-evenly;
  align-items: center;
  background: transparent;

  height: max-content;
  padding: 0;
  border: none;
  outline: none;

  cursor: pointer;

  div {
    background: ${(p) => (p.isActive ? p.theme.textDarkActiveColor : 'transparent')};
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 0 0.1rem;

    &:first-child {
      padding: 0;
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

const PaymentIconContainer = styled.div`
  display: flex;
  width: 200px;
  height: 100px;
  align-items: center;
  justify-content: center;
  transition: background 0.35s ease-out;

  border: 2px solid ${(p) => p.theme.textDarkActiveColor};
  border-radius: 0.5rem;

  svg {
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100px;
    height: 70px;
  }

  &:hover {
    background: ${(p) => p.theme.textDarkColor};
  }
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
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const isCheckoutLogin = useAppSelector(selectCheckoutLogin);
  const isSofort = useAppSelector(selectIsSofort);
  const isPreOrder = useAppSelector(selectIsPreOrder);

  const { t } = useTranslation('page-checkout');
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState('STRIPE');
  const [inHover, setHover] = useState('');

  /**
   * @description for creating a order from node api
   */
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
          is_sofort: isSofort,
          is_pre_order: isPreOrder,
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
        amplitudeEvent(constructEventName(`order now createOrder error`, 'response'), response);

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
      amplitudeEvent(constructEventName(`order now createOrder error`, 'method'), { error });

      throw error;
    }
  }

  function isOrderPossible() {
    if (orderType === 'DELIVERY') return deliveryFinances && deliveryFinances.amount ? cartData.cartCost >= deliveryFinances.amount : false;
    else return true;
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
  }, [
    bearerToken,
    shopData?.id,
    customerData.name,
    customerData.email,
    customerData.phone,
    customerData.country_code,
    wantAtData,
    deliveryFinances,
  ]);

  useEffect(() => {
    dispatch(updateCheckoutLogin(false)); // ? Fix inital render glitch on checkout button overlfow
  }, []);

  async function onPaymentDone() {
    router.push(`/${languageCode}/order-placed`);
  }

  async function onClickCashOrderButton() {
    try {
      amplitudeEvent(constructEventName(`order now cash`, 'button'), {});

      if (orderButtonLoading || !orderCanBePlaced) {
        amplitudeEvent(constructEventName(`order now cash not available`, 'button'), {});

        return;
      }

      setOrderButtonLoading(true);
      const response = await createOrder();

      if (!response.result) amplitudeEvent(constructEventName(`order now cash createOrder error`, 'response'), response);

      await onPaymentDone();
    } catch (error) {
      console.error(error);
      amplitudeEvent(constructEventName(`order now cash error`, 'response'), { error });
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
    <Wrapper>
      <StyledCheckoutCard>
        <StyledCheckoutTitle>
          {t('@payment')} <span>{paymentTitle ? `(${paymentTitle})` : ''}</span>
        </StyledCheckoutTitle>

        <Row>
          <Col xs={12}>
            <PaymentMethodList>
              {[
                {
                  method: 'STRIPE' as ICheckoutPaymentMethods,
                  img: (
                    <PaymentIconContainer onMouseEnter={() => setHover('STRIPE')} onMouseLeave={() => setHover('')}>
                      {inHover === 'STRIPE' || currentPaymentMethod === 'STRIPE' ? <SvgCashHoverIcon /> : <SvgCashIcon />}
                    </PaymentIconContainer>
                  ),

                  show: shopData?.stripe_available,
                  isHover: inHover === 'STRIPE',
                },
                {
                  method: 'PAYPAL' as ICheckoutPaymentMethods,
                  img: (
                    <PaymentIconContainer onMouseEnter={() => setHover('PAYPAL')} onMouseLeave={() => setHover('')}>
                      {inHover === 'PAYPAL' || currentPaymentMethod === 'PAYPAL' ? <SvgPaypalHoverIcon /> : <SvgPaypalIcon />}
                    </PaymentIconContainer>
                  ),
                  show: shopData?.paypal_available,
                  isHover: inHover === 'PAYPAL',
                },
                {
                  method: 'CASH' as ICheckoutPaymentMethods,
                  img: (
                    <PaymentIconContainer onMouseEnter={() => setHover('CASH')} onMouseLeave={() => setHover('')}>
                      {inHover === 'CASH' || currentPaymentMethod === 'CASH' ? <SvgCashHoverIcon /> : <SvgCashIcon />}
                    </PaymentIconContainer>
                  ),
                  show: true,
                  isHover: inHover === 'CASH',
                },
              ].map((item) => {
                return (
                  item.show && (
                    <PaymentMethodItems
                      isActive={currentPaymentMethod === item.method}
                      key={item.method}
                      onClick={() => {
                        dispatch(updatePaymentMethod(item.method));
                        amplitudeEvent(constructEventName(`payment selection`, 'button'), {
                          prevSelected: currentPaymentMethod,
                          currentSelected: item.method,
                        });
                      }}
                    >
                      {item.img}
                    </PaymentMethodItems>
                  )
                );
              })}
            </PaymentMethodList>
          </Col>
        </Row>
      </StyledCheckoutCard>
      <Row>
        <Col xs={12}>
          <StyledCheckoutCard>
            {!!isCheckoutLogin ? <CheckoutLoginDropdown /> : <OrderButtonTopLevelContainer>{orderButton}</OrderButtonTopLevelContainer>}

            {!!isLoggedIn && (
              <Col xs={12}>
                <Disclaimer>
                  {t('@agreement-part-1')}{' '}
                  <span style={{ textTransform: 'uppercase', fontWeight: 'bolder', color: '#333' }}>{t('@order-and-pay')}</span>{' '}
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
          </StyledCheckoutCard>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default CheckoutPagePayment;
