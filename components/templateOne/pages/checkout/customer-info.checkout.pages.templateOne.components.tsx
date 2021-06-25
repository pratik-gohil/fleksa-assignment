import React, { FunctionComponent } from "react";
import { Row, Col } from "react-grid-system";

import styled from "styled-components";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectCustomer } from "../../../../redux/slices/user.slices.redux";


export const StyledCheckoutCard = styled.div`
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
  margin: ${props => props.theme.dimen.X4}px 0;
  overflow: hidden;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
`

export const StyledCheckoutTitle = styled.h3`
  margin: 0;
  padding-bottom: ${props => props.theme.dimen.X4}px;
`

export const StyledCheckoutInput = styled.input`
  width: 100%;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
`

const CheckoutPageCustomerInfo: FunctionComponent = ({}) => {
  const userData = useAppSelector(selectCustomer)

  return <StyledCheckoutCard>
    <StyledCheckoutTitle>How can we reach you?</StyledCheckoutTitle>
    <Row>
      <Col xs={6}>
        <p>Name</p>
      </Col>
      <Col xs={6}>
        <StyledCheckoutInput type="text" placeholder="Name" value={userData.name} />
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <p>Email</p>
      </Col>
      <Col xs={6}>
        <StyledCheckoutInput type="text" placeholder="Email" value={userData.email || ""} />
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <p>Phone</p>
      </Col>
      <Col xs={6}>
        <StyledCheckoutInput type="text" placeholder="Phone" value={userData.phone || ""} />
      </Col>
    </Row>
  </StyledCheckoutCard>
}

export default CheckoutPageCustomerInfo
