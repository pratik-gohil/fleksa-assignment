import React, { FunctionComponent } from "react";
import { Row, Col } from "react-grid-system";

import "react-phone-input-2/lib/material.css"
import styled from "styled-components";
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

const CheckoutPageCart: FunctionComponent = ({}) => {
  return <StyledCheckoutCard>
    <StyledCheckoutTitle>CART</StyledCheckoutTitle>
    <Row>
      <Col xs={12}>
        <StyledCheckoutTextarea />
      </Col>
    </Row>
  </StyledCheckoutCard>
}

export default CheckoutPageCart
