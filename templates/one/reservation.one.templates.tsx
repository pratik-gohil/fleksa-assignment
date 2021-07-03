import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import Header from '../../components/templateOne/pages/reservation/header.reservation.pages.templateOne.components';
import FormLeftInputs from '../../components/templateOne/pages/reservation/form-left.reservation.pages.templateOne.components';
import FormRightInputs from '../../components/templateOne/pages/reservation/form-right.reservation.pages.templateOne.components';

import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';
import { useState } from 'react';
import moment from 'moment';
import { ILabelValue } from '../../utils/restaurant-timings.utils';

const ReservationContainer = styled.section`
  position: relative;
  margin-top: 4rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-top: 1rem;
  }
`;

const WidthFix = styled.div`
  width: 100%;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-bottom: 30px;
  }
`;

const FormContainer = styled.div`
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
`;

const CoupleImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  max-width: 40%;
  transform: scaleX(-1);

  @media (min-width: 992px) {
    max-width: 30%;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: none;
  }
`;

const ReservationTemplateOne: FunctionComponent = ({}) => {
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState<ILabelValue>({
    value: '',
    label: '',
  });
  const [totalGuest, setTotalGuest] = useState('2');

  return (
    <ReservationContainer>
      <WidthFix>
        <Container fluid>
          <Row justify="center" nogutter nowrap>
            <Col sm={8} lg={10}>
              <Row>
                <Col sm={12}>
                  <Header />
                </Col>
              </Row>

              <FormContainer>
                <Row justify="center">
                  <Col xl={6} lg={6} sm={12}>
                    <FormRightInputs
                      time={time}
                      date={date}
                      setTime={setTime}
                      setDate={setDate}
                      totalGuest={totalGuest}
                      setTotalGuest={setTotalGuest}
                    />
                  </Col>
                  <Col xl={6} lg={6} sm={12}>
                    <FormLeftInputs time={time} date={date} totalGuest={totalGuest} />
                  </Col>
                </Row>
              </FormContainer>
            </Col>
          </Row>
        </Container>
      </WidthFix>

      <CoupleImg src="/assets/svg/couple.svg" alt="couple" />
      {/* <Snackbar message="test error message" /> */}
    </ReservationContainer>
  );
};

export default ReservationTemplateOne;
