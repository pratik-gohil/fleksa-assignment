import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";

import "react-phone-input-2/lib/material.css"
import CheckoutPageComments from "../../components/templateOne/pages/checkout/comments.checkout.pages.templateOne.components";
import CheckoutPageCustomerInfo from "../../components/templateOne/pages/checkout/customer-info.checkout.pages.templateOne.components";
import CheckoutPagePayment from "../../components/templateOne/pages/checkout/payment.checkout.pages.templateOne.components";


const CheckoutPageTemplateOne: FunctionComponent = ({}) => {
  return <Container>
    <Row>
      <Col lg={6}>
        <CheckoutPageCustomerInfo />
        <CheckoutPageComments />
        <CheckoutPagePayment />
      </Col>
      <Col lg={6}>
        
      </Col>
    </Row>
  </Container>
}

export default CheckoutPageTemplateOne
