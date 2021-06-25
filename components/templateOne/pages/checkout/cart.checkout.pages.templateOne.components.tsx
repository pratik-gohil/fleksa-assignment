import React, { FunctionComponent } from "react";
import { Row, Col } from "react-grid-system";

import styled from "styled-components";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectCart } from "../../../../redux/slices/cart.slices.redux";
import { selectTip } from "../../../../redux/slices/checkout.slices.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
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
  margin: 0;
  span {
    font-weight: 600;
  }
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

  const cartItemKeys = cartData.items? Object.keys(cartData.items): []

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>CART</StyledCheckoutTitle>
    <Row>
      <Col xs={12}>
        {cartItemKeys.map(key => {
          const item = cartData.items[key]
          return <ContainerItem key={key}>
            <Title><span>X{item.quantity}</span> {item.mainName[language]}</Title>
            <Price>€{item.totalCost.toFixed(2)}</Price>
          </ContainerItem>
        })}
      </Col>
      <Col xs={12}>
        <Divider />
      </Col>
      <Col xs={12}>
        <ContainerItem>
          <Title>Subtotal</Title>
          <Price>€{cartData.cartCost.toFixed(2)}</Price>
        </ContainerItem>
        <ContainerItem>
          <Title>Discount</Title>
          <Price>€{0}</Price>
        </ContainerItem>
        {tipData && tipData > 0? <ContainerItem>
          <Title>Tip</Title>
          <Price>€{tipData.toFixed(2)}</Price>
        </ContainerItem>: <></>}
        <ContainerItem>
          <Title style={{ fontWeight: 700 }}>Total</Title>
          <Price>€{(cartData.cartCost + (tipData || 0)).toFixed(2)}</Price>
        </ContainerItem>
      </Col>
    </Row>
  </StyledCheckoutCard>
}

export default CheckoutPageCart
