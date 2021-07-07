import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Left from './Left';
import Right from './Right';
import Container from './Container.particular-order.partial';
import ProfileLanguage from '../../../constant/language/profile';

import { useSelector } from 'react-redux';

import { getLanguageValue } from '../../../functions/utilities';
import { getLanguage } from '../../../redux/languageSlice';

const DeliveryTime = ({ delivery_time }) => {
  const language = useSelector(getLanguage);
  return (
    delivery_time && (
      <Container>
        <Left>
          <Title>{getLanguageValue(ProfileLanguage, 'Delivery Time', language)}</Title>
        </Left>
        <Right>
          <DateText>{moment(new Date(`${delivery_time}`)).format('ll')}</DateText>
          {getLanguageValue(ProfileLanguage, 'at', language)} ca.
          <Time>{moment(new Date(`${delivery_time}`)).format('HH:mm')}</Time>
        </Right>
      </Container>
    )
  );
};

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
`;
// const Time = styled.p``

const DateText = styled.p`
  margin-right: 0.3em;
`;
const Time = styled.p`
  margin-left: 0.3em;
`;

export default DeliveryTime;
