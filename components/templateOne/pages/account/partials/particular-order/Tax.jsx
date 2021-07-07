import React from 'react';
import styled from 'styled-components';
import Left from './Left';
import Right from './Right';
import Container from './Container';
import { getLanguageValue } from '../../../functions/utilities';
import ProfileLanguage from '../../../constant/language/profile';
import { getLanguage } from '../../../redux/languageSlice';
import { useSelector } from 'react-redux';

const Tax = ({ tax }) => {
  const language = useSelector(getLanguage);

  if (!tax) return null;

  return (
    <Container>
      <Left>
        <Title>{getLanguageValue(ProfileLanguage, 'Tax', language)}</Title>
      </Left>
      <Right>
        <Price>{tax.toFixed(2).replace('.', ',')} &euro; </Price>
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

export default Tax;
