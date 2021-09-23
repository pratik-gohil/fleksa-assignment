import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import { Row, Col } from 'react-grid-system';

import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCart } from '../../../../redux/slices/cart.slices.redux';
import { selectDeliveryFinances, selectOrderType, selectPromoCode, selectTip } from '../../../../redux/slices/checkout.slices.redux';
import { selectLanguage, selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { checkoutFinalAmount } from '../../../../utils/checkout.utils';
import formatCurrency from '../../../../utils/formatCurrency';
import { StyledCheckoutTitle } from './customer-info.checkout.pages.templateOne.components';
import CheckoutPagePromoCode from './promo-code.checkout.pages.templateOne.components';
import CheckoutPageTip from './tip.checkout.pahes.templateOne.components';

export const StyledCheckoutTextarea = styled.textarea`
  width: 100%;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: ${(props) => props.theme.dimen.X4}px;
  font-family: inherit;
  font-size: inherit;
  height: 160px;
`;

const ContainerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const ContainerCartItem = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.3rem 0;
  margin: 0;
`;

const ContainerCartItemBody = styled(ContainerItem)`
  padding: 0;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 600;
  span {
    font-weight: 600;
  }
`;

const CartItemTitle = styled.span<{ isStrikeThrough: boolean }>`
  display: flex;
  flex: 1;
  margin: 0;
  font-weight: 600;

  ${({ isStrikeThrough }) =>
    isStrikeThrough &&
    `
      text-decoration: line-through;
      text-decoration-thickness: 2px;  
  `}
`;

const Quantity = styled.span`
  white-space: nowrap;
  font-weight: 400 !important;
`;

const Price = styled.p`
  margin: 0;
  font-weight: 600;
`;

const CartItemPrice = styled.span<{ isStrikeThrough: boolean }>`
  margin: 0;
  font-weight: 600;

  ${({ isStrikeThrough }) =>
    isStrikeThrough &&
    `
      text-decoration: line-through;
      text-decoration-thickness: 2px;  
  `}
`;

const Divider = styled.hr`
  border-color: rgba(0, 0, 0, 0.1);
`;

const InfoCartSvgImage = styled.img`
  margin: 0 0.5rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const CustomStyledCheckoutCard = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 1rem 0;

  margin: ${(props) => props.theme.dimen.X4}px 0;
  overflow: hidden;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
`;

const CustomStyledCheckoutTitle = styled(StyledCheckoutTitle)`
  padding: 0 1rem;
`;

const CheckoutPageCart: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const cartData = useAppSelector(selectCart);
  const tipData = useAppSelector(selectTip);
  const orderType = useAppSelector(selectOrderType);
  const promoData = useAppSelector(selectPromoCode);
  const languageCode = useAppSelector(selectLanguageCode);
  const deliveryFinances = useAppSelector(selectDeliveryFinances);

  const { t } = useTranslation('page-checkout');

  const cartItemKeys = cartData.items ? Object.keys(cartData.items) : [];
  const deliveryFeeApplicable =
    orderType === 'DELIVERY' ? (deliveryFinances?.free_from ? cartData.cartCost < deliveryFinances.free_from : true) : false;
  const deliveryFee = deliveryFeeApplicable && deliveryFinances?.charges ? deliveryFinances?.charges : 0;

  return (
    <CustomStyledCheckoutCard>
      <CustomStyledCheckoutTitle>{t('@cart')}</CustomStyledCheckoutTitle>
      <Row>
        <Col xs={12}>
          {cartItemKeys.map((key) => {
            const item = cartData.items[key];
            return (
              <ContainerItem key={key}>
                <ContainerCartItem>
                  <ContainerCartItemBody>
                    <CartItemTitle isStrikeThrough={!item.isAvailable}>
                      <Quantity>{item.quantity}x - </Quantity> &nbsp; {item.mainName[language]}
                    </CartItemTitle>

                    {!item.isAvailable && <InfoCartSvgImage src="https://img.icons8.com/ios/50/000000/info--v4.png" />}
                  </ContainerCartItemBody>

                  <CartItemPrice isStrikeThrough={!item.isAvailable}>{formatCurrency(item.totalCost, languageCode)}</CartItemPrice>
                </ContainerCartItem>
              </ContainerItem>
            );
          })}
        </Col>

        <Col xs={12}>
          <Divider />
        </Col>

        <Col xs={12}>
          <ContainerItem>
            <Title>{t('@subtotal')}</Title>
            <Price>{formatCurrency(cartData.cartCost, languageCode)}</Price>
          </ContainerItem>

          {/* Adding Tip section  */}
          <CheckoutPageTip />

          {/* Adding promo code section  */}
          <CheckoutPagePromoCode />

          {deliveryFee > 0 ? (
            <ContainerItem>
              <Title>{t('@delivery')}</Title>
              <Price>{formatCurrency(deliveryFee, languageCode)}</Price>
            </ContainerItem>
          ) : (
            <></>
          )}
          <ContainerItem>
            <Title style={{ fontWeight: 700 }}>{t('@total')}</Title>
            <Price>{formatCurrency(checkoutFinalAmount(cartData.cartCost, tipData, promoData?.value, deliveryFee), languageCode)}</Price>
          </ContainerItem>
        </Col>
      </Row>
    </CustomStyledCheckoutCard>
  );
};

export default CheckoutPageCart;
