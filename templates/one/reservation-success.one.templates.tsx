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

const Image = styled.img`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 80%;
  }
`;

const Text = styled.h2`
  width: 80%;
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
  }
`;

const ReservationSuccessPageTemplateOne: FunctionComponent = ({}) => {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Image src={OrderPlacedImage} alt="person jumping" />
            <Text>Your Table is reserved successfully.</Text>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ReservationSuccessPageTemplateOne;
