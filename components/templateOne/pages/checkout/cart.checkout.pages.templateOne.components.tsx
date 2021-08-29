import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';

import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCart } from '../../../../redux/slices/cart.slices.redux';
import { selectDeliveryFinances, selectOrderType, selectPromoCode, selectTip } from '../../../../redux/slices/checkout.slices.redux';
import { selectLanguage, selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { checkoutFinalAmount } from '../../../../utils/checkout.utils';
import formatCurrency from '../../../../utils/formatCurrency';
import { StyledCheckoutCard, StyledCheckoutTitle } from './customer-info.checkout.pages.templateOne.components'; 

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
`;

const ContainerCartItem = styled.p`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.3rem 0;
  margin: 0;
`;

const ContainerCartItemBody = styled(ContainerItem)``;

const Title = styled.p`
  display: flex;
  flex: 1;
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

const CheckoutPageCart: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const cartData = useAppSelector(selectCart);
  const tipData = useAppSelector(selectTip);
  const orderType = useAppSelector(selectOrderType);
  const promoData = useAppSelector(selectPromoCode);
  const languageCode = useAppSelector(selectLanguageCode);
  const deliveryFinances = useAppSelector(selectDeliveryFinances);
  const { t } = useTranslation('page-checkout');
  const [isTooltipVisible, setTooltipVisibility] = useState(false);

  const cartItemKeys = cartData.items ? Object.keys(cartData.items) : [];
  const deliveryFeeApplicable =
    orderType === 'DELIVERY' ? (deliveryFinances?.free_from ? cartData.cartCost < deliveryFinances.free_from : true) : false;
  const deliveryFee = deliveryFeeApplicable && deliveryFinances?.charges ? deliveryFinances?.charges : 0;

  useEffect(() => {
    setTooltipVisibility(true);
  }, []);

  return (
    <StyledCheckoutCard>
      <StyledCheckoutTitle>{t('@cart')}</StyledCheckoutTitle>
      <Row>
        <Col xs={12}>
          {cartItemKeys.map((key) => {
            const item = cartData.items[key];
            return (
              <ContainerItem key={key}>
                {isTooltipVisible && (
                  <>
                    <ContainerCartItem>
                      <ContainerCartItemBody>
                        <CartItemTitle isStrikeThrough={!item.isAvailable}>
                          <Quantity>{item.quantity}x - </Quantity> &nbsp; {item.mainName[language]}
                        </CartItemTitle>

                        {!item.isAvailable && <InfoCartSvgImage src="https://img.icons8.com/ios/50/000000/info--v4.png" />}
                      </ContainerCartItemBody>

                      <CartItemPrice isStrikeThrough={!item.isAvailable}>{formatCurrency(item.totalCost, languageCode)}</CartItemPrice>
                    </ContainerCartItem>
                  </>
                )}
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
          {promoData && (
            <ContainerItem>
              <Title>{t('@discount')}</Title>
              <Price>- {formatCurrency(promoData.value, languageCode)}</Price>
            </ContainerItem>
          )}
          {tipData && tipData > 0 ? (
            <ContainerItem>
              <Title>{t('@tip-cart')}</Title>
              <Price>{formatCurrency(tipData, languageCode)}</Price>
            </ContainerItem>
          ) : (
            <></>
          )}
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
    </StyledCheckoutCard>
  );
};

export default CheckoutPageCart;
