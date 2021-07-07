import React from 'react';
import styled from 'styled-components';
import Left from './Left';
import Right from './Right';
import Container from './Container.particular-order.partial';
import { getLanguageValue } from '../../../functions/utilities';
import ProfileLanguage from '../../../constant/language/profile';
import { getLanguage } from '../../../redux/languageSlice';
import { useSelector } from 'react-redux';

const Total = ({ total }) => {
  const language = useSelector(getLanguage);
  return (
    <Container>
      <Left>
        <Title>{getLanguageValue(ProfileLanguage, 'Total', language)}</Title>
      </Left>
      <Right>
        <Price>{total.toFixed(2).replace('.', ',')} &euro;</Price>
      </Right>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
`;
const Price = styled.p`
  font-weight: 700;
`;

export default Total;
