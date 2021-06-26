import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";


import CheckoutPageCart from "../../components/templateOne/pages/checkout/cart.checkout.pages.templateOne.components";
import CheckoutPageComments from "../../components/templateOne/pages/checkout/comments.checkout.pages.templateOne.components";
import CheckoutPageCustomerInfo from "../../components/templateOne/pages/checkout/customer-info.checkout.pages.templateOne.components";
import CheckoutPagePayment from "../../components/templateOne/pages/checkout/payment.checkout.pages.templateOne.components";
import CheckoutPageTip from "../../components/templateOne/pages/checkout/tip.checkout.pahes.templateOne.components";
import { BREAKPOINTS } from "../../constants/grid-system-configuration";


const CartContainerLarge = styled.div`
  display: none;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`

const CartContainerSmall = styled.div`
  display: block;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`

const CheckoutPageTemplateOne: FunctionComponent = ({}) => {
  return <PayPalScriptProvider options={{
    debug: false,
    "client-id": "sb",
    // currency: "USD",
    // intent: "capture",
    // "data-client-token": "abc123xyz==",
  }}>
    <Container>
      <Row>
        <Col lg={6}>
          <CheckoutPageCustomerInfo />
          <CartContainerSmall>
            <CheckoutPageCart />
          </CartContainerSmall>
          <CheckoutPageComments />
          <CheckoutPageTip />
          <CheckoutPagePayment />
        </Col>
        <Col lg={6}>
          <CartContainerLarge>
            <CheckoutPageCart />
          </CartContainerLarge>
        </Col>
      </Row>
    </Container>
  </PayPalScriptProvider>
}

export default CheckoutPageTemplateOne
