import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import { Row, Col } from 'react-grid-system';

import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCart } from '../../../../redux/slices/cart.slices.redux';
import {
  selectDeliveryFinances,
  selectOrderType,
  selectPromoCode,
  selectTip,
  updatePromoCode,
  updateTip,
} from '../../../../redux/slices/checkout.slices.redux';
import { selectLanguage, selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { checkoutFinalAmount } from '../../../../utils/checkout.utils';
import formatCurrency from '../../../../utils/formatCurrency';
import { StyledCheckoutCard, StyledCheckoutTitle } from './customer-info.checkout.pages.templateOne.components';
import CheckoutPagePromoCode from './promo-code.checkout.pages.templateOne.components';
import CheckoutPageTip from './tip.checkout.pahes.templateOne.components';
import SvgOffer from '../../../../public/assets/svg/checkout/offerIcon.svg';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
// import SvgCross from '../../../../public/assets/svg/cross.svg';

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

const AppliedCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TextSaved = styled.p`
  display: flex;
  margin-left: 12px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-size: 13px;
    margin-left: 5px;
  }
`;

const RemovePromo = styled.div`
  cursor: pointer;
  border: ${(props) => props.theme.border};
  border-radius: 100px;
  margin: 0 1rem;
  opacity: 0.5;
  transition: opacity 0.1s ease-out;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;

  &:hover,
  &:active,
  &:focus {
    opacity: 1;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 0 0 0 5px;
    padding: 0.3rem;
  }
`;

const ContainerItemTip = styled(ContainerItem)`
  padding-top: 0.5rem;
`;

const SvgCrossImage = styled.img`
  width: 10px;
  height: 10px;
`;

const CheckoutPageCart: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const cartData = useAppSelector(selectCart);
  const tipData = useAppSelector(selectTip);
  const orderType = useAppSelector(selectOrderType);
  const promoData = useAppSelector(selectPromoCode);
  const languageCode = useAppSelector(selectLanguageCode);
  const deliveryFinances = useAppSelector(selectDeliveryFinances);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('page-checkout');

  const cartItemKeys = cartData.items ? Object.keys(cartData.items) : [];
  const deliveryFeeApplicable =
    orderType === 'DELIVERY' ? (deliveryFinances?.free_from ? cartData.cartCost < deliveryFinances.free_from : true) : false;
  const deliveryFee = deliveryFeeApplicable && deliveryFinances?.charges ? deliveryFinances?.charges : 0;

  return (
    <StyledCheckoutCard>
      <StyledCheckoutTitle>{t('@cart')}</StyledCheckoutTitle>
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

          {tipData && tipData > 0 ? (
            <ContainerItemTip>
              <AppliedCodeContainer>
                <Title>{t('@tip-cart')}</Title>

                <RemovePromo onClick={() => dispatch(updateTip(0))}>
                  <SvgCrossImage src="/assets/svg/cross.svg" />
                </RemovePromo>
              </AppliedCodeContainer>

              <Price>{formatCurrency(tipData, languageCode)}</Price>
            </ContainerItemTip>
          ) : (
            <CheckoutPageTip />
          )}

          {promoData ? (
            <ContainerItem>
              <AppliedCodeContainer>
                <SvgOffer />
                <TextSaved>
                  {t('@saved')} <strong style={{ marginLeft: 4 }}>{formatCurrency(promoData.value, languageCode)}</strong>
                </TextSaved>

                <RemovePromo onClick={() => dispatch(updatePromoCode(null))}>
                  <SvgCrossImage src="/assets/svg/cross.svg" />
                </RemovePromo>
              </AppliedCodeContainer>

              <Price> - {formatCurrency(promoData.value, languageCode)}</Price>
            </ContainerItem>
          ) : (
            <CheckoutPagePromoCode />
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
