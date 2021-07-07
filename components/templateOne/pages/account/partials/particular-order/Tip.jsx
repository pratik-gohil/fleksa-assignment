import React from 'react';
import styled from 'styled-components';
import Left from './Left';
import Right from './Right';
import Container from './Container.particular-order.partial';
import { getLanguageValue } from '../../../functions/utilities';
import ProfileLanguage from '../../../constant/language/profile';
import { getLanguage } from '../../../redux/languageSlice';
import { useSelector } from 'react-redux';

const Tip = ({ tip }) => {
  const language = useSelector(getLanguage);

  if (!tip) return null;

  return (
    <Container>
      <Left>
        <Title>{getLanguageValue(ProfileLanguage, 'Tip', language)}</Title>
      </Left>
      <Right>
        <Price>{tip.toFixed(2).replace('.', ',')} &euro;</Price>
      </Right>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 1rem;
  font-weight: 400;
`;
const Price = styled.p`
  font-weight: 500;
`;

export default Tip;
