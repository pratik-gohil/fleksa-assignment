import React, { FunctionComponent } from "react";
import { Row, Col } from "react-grid-system";

import styled from "styled-components";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectCart } from "../../../../redux/slices/cart.slices.redux";
import { selectDeliveryFinances, selectPromoCode, selectTip } from "../../../../redux/slices/checkout.slices.redux";
import { selectLanguage, selectLanguageCode } from "../../../../redux/slices/configuration.slices.redux";
import { checkoutFinalAmount } from "../../../../utils/checkout.utils";
import formatCurrency from "../../../../utils/formatCurrency";
import { StyledCheckoutCard, StyledCheckoutTitle } from "./customer-info.checkout.pages.templateOne.components";

export const StyledCheckoutTextarea = styled.textarea`
  width: 100%;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
  font-family: inherit;
  font-size: inherit;
  height: 160px;
`

const ContainerItem = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.p`
  display: flex;
  flex: 1;
  margin: 0;
  font-weight: 600;
  span {
    font-weight: 600;
  }
`

const Quantity = styled.span`
  white-space: nowrap;
  margin: 0 6px;
  font-weight: 400!important;
`

const Price = styled.p`
  margin: 0;
  font-weight: 600;
`

const Divider = styled.hr`
  border-color: rgba(0, 0, 0, 0.1);
`

const CheckoutPageCart: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const cartData = useAppSelector(selectCart)
  const tipData = useAppSelector(selectTip)
  const promoData = useAppSelector(selectPromoCode)
  const languageCode = useAppSelector(selectLanguageCode)
  const deliveryFinances = useAppSelector(selectDeliveryFinances)

  const cartItemKeys = cartData.items? Object.keys(cartData.items): []
  const deliveryFeeApplicable = deliveryFinances?.free_from? cartData.cartCost < deliveryFinances.free_from: true
  const deliveryFee = deliveryFeeApplicable && deliveryFinances?.charges? deliveryFinances?.charges: 0

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>CART</StyledCheckoutTitle>
    <Row>
      <Col xs={12}>
        {cartItemKeys.map(key => {
          const item = cartData.items[key]
          return <ContainerItem key={key}>
            <Title><Quantity>{item.quantity}x - </Quantity> {item.mainName[language]}</Title> 
            <Price>{formatCurrency(item.totalCost, languageCode)}</Price>
          </ContainerItem>
        })}
      </Col>
      <Col xs={12}>
        <Divider />
      </Col>
      <Col xs={12}>
        <ContainerItem>
          <Title>Subtotal</Title>
          <Price>{formatCurrency(cartData.cartCost, languageCode)}</Price>
        </ContainerItem>
        {promoData && <ContainerItem>
          <Title>Discount</Title>
          <Price>- {formatCurrency(promoData.value, languageCode)}</Price>
        </ContainerItem>}
        {tipData && tipData > 0? <ContainerItem>
          <Title>Tip</Title>
          <Price>{formatCurrency(tipData, languageCode)}</Price>
        </ContainerItem>: <></>}
        {deliveryFee > 0? <ContainerItem>
          <Title>Delivery</Title>
          <Price>{formatCurrency(deliveryFee, languageCode)}</Price>
        </ContainerItem>: <></>}
        <ContainerItem>
          <Title style={{ fontWeight: 700 }}>Total</Title>
          <Price>{formatCurrency(checkoutFinalAmount(cartData.cartCost, tipData, promoData?.value, deliveryFee), languageCode)}</Price>
        </ContainerItem>
      </Col>
    </Row>
  </StyledCheckoutCard>
}

export default CheckoutPageCart
