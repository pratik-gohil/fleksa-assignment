import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import Header from '../../components/templateOne/pages/reservation/header.reservation.pages.templateOne.components';
import FormLeftInputs from '../../components/templateOne/pages/reservation/form-left.reservation.pages.templateOne.components';
import FormRightInputs from '../../components/templateOne/pages/reservation/form-right.reservation.pages.templateOne.components';

import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';

const ReservationContainer = styled.section`
  /* height: calc(100vh - ${(props) => props.theme.navMobile.height}px); */
  display: flex;
  width: 100%;

  /* @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100vh - ${(props) => props.theme.navDesktop.height}px);
  } */
`;

const WidthFix = styled.div`
  width: 100%;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-bottom: 120px;
  }
`;

const FormContainer = styled.div`
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
`;

const ReservationTemplateOne: FunctionComponent = ({}) => {
  return (
    <ReservationContainer>
      <WidthFix>
        <Container fluid>
          <Row justify="center" nogutter nowrap>
            <Col sm={8}>
              <Row>
                <Col sm={12}>
                  <Header />
                </Col>
              </Row>

              <FormContainer>
                <Row justify="center">
                  <Col xl={6}>
                    <FormLeftInputs />
                  </Col>
                  <Col xl={6}>
                    <FormRightInputs />
                  </Col>
                </Row>
              </FormContainer>
            </Col>
          </Row>
        </Container>
      </WidthFix>
    </ReservationContainer>
  );
};

export default ReservationTemplateOne;
