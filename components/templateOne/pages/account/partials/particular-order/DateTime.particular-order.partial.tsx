import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Left from './Left';
import Right from './Right';
import Container from './Container.particular-order.partial';

interface IDateTimePartialProps {
  created_at?: string;
}

const DateTimePartial: FunctionComponent<IDateTimePartialProps> = ({ created_at }) => {
  return (
    <Container>
      <Left>
        <Title>Placed on</Title>
      </Left>

      <Right>
        <DateText>{moment(new Date(`${created_at}`)).format('ll')}</DateText>
        at
        <Time>{moment(new Date(`${created_at}`)).format('HH:mm')}</Time>
      </Right>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 1.3em;
`;
const DateText = styled.p`
  margin-right: 0.3em;
`;
const Time = styled.p`
  margin-left: 0.3em;
`;

export default DateTimePartial;
