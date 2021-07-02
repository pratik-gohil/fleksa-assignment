import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import Header from '../../components/templateOne/pages/reservation/header.reservation.pages.templateOne.components';

import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';

const ReservationContainer = styled.section`
  height: calc(100vh - ${(props) => props.theme.navMobile.height}px);
  display: flex;
  width: 100%;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100vh - ${(props) => props.theme.navDesktop.height}px);
  }
`;

const WidthFix = styled.div`
  width: 100%;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-bottom: 120px;
  }
`;

const ReservationTemplateOne: FunctionComponent = ({}) => {
  return (
    <ReservationContainer>
      <WidthFix>
        <Container>
          <Row>
            <Col sm={12}>
              <Header />
            </Col>
          </Row>
          <Row justify="center">
            <Col xl={10}></Col>
          </Row>
        </Container>
      </WidthFix>
    </ReservationContainer>
  );
};

export default ReservationTemplateOne;
