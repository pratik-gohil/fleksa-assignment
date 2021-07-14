import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';

const OrderPlacedImage = '/assets/svg/success/order_placed.svg';

const Wrapper = styled.div`
  height: calc(100vh - ${(props) => props.theme.navMobile.height}px);
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100vh - ${(props) => props.theme.navDesktop.height}px);
  }
`;

const ViewManageButton = styled.a`
  display: inline-block;
  background-color: ${(props) => props.theme.textDarkColor};
  border: ${(props) => props.theme.border};
  padding: ${(props) => props.theme.dimen.X4}px;
  font-weight: 700;
  font-size: 18px;
  margin-top: 2rem;
  color: ${(props) => props.theme.textLightActiveColor};
`;

const Image = styled.img``;

const OrderPlacedPageTemplateOne: FunctionComponent = ({}) => {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <h2>Your order is placed successfully</h2>
            <Image src={OrderPlacedImage} alt="person jumping" />
            <ViewManageButton href="/account/order-history">View or Manage Order</ViewManageButton>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default OrderPlacedPageTemplateOne;
