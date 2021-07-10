import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import { BREAKPOINTS } from "../../constants/grid-system-configuration";

const Wrapper = styled.div`
  height: calc(100vh - ${props => props.theme.navMobile.height}px);
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100vh - ${props => props.theme.navDesktop.height}px);
  }
`

const ViewManageButton = styled.a`
  display: inline-block;
  background-color: ${props => props.theme.primaryColor};
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
  font-weight: 700;
  font-size: 18px;
`

const OrderPlacedPageTemplateOne: FunctionComponent = ({}) => {
  return <Wrapper>
    <Container>
      <Row>
        <Col style={{ display: "flex", alignItems: 'center', flexDirection: 'column'}}>
          <h2>Your order is placed successfully</h2>
          <ViewManageButton href="/account/order-history">View or Manage Order</ViewManageButton>
        </Col>
      </Row>
    </Container>
  </Wrapper>
}

export default OrderPlacedPageTemplateOne
