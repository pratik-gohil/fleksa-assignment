import React from 'react';
import styled from 'styled-components';
import Left from './Left';
import Right from './Right';
import Container from './Container.particular-order.partial';
import { getLanguageValue } from '../../../functions/utilities';
import CheckoutLanuguage from '../../../constant/language/checkout';
import { getLanguage } from '../../../redux/languageSlice';
import { useSelector } from 'react-redux';

const OfferAmount = ({ offer }) => {
  const language = useSelector(getLanguage);

  if (!offer) return null;

  return (
    <Container>
      <Left>
        <Title>{getLanguageValue(CheckoutLanuguage, 'Offer', language)}</Title>
      </Left>

      <Right>
        <Price>- {offer.toFixed(2).replace('.', ',')} &euro;</Price>
      </Right>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 1rem;
  font-weight: 400;
`;
const Price = styled.p`
  font-weight: 600;
`;

export default OfferAmount;
