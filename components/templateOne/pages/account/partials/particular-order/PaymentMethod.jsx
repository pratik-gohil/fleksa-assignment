import React from 'react';
import styled from 'styled-components';
import Left from './Left';
import Right from './Right';
import Container from './Container.particular-order.partial';
import { getLanguageValue } from '../../../functions/utilities';
import ProfileLanguage from '../../../constant/language/profile';
import CheckoutLanguage from '../../../constant/language/checkout';
import { getLanguage } from '../../../redux/languageSlice';
import { useSelector } from 'react-redux';

const PaymentMethod = ({ payment_method }) => {
  const language = useSelector(getLanguage);

  return (
    <Container>
      <Left>
        <Title>{getLanguageValue(ProfileLanguage, 'Payment Method', language)}</Title>
      </Left>
      <Right>
        <Price>
          {(payment_method === 'CASH' && getLanguageValue(CheckoutLanguage, 'Cash', language)) ||
            (payment_method === 'STRIPE' && getLanguageValue(CheckoutLanguage, 'STRIPE', language)) ||
            (payment_method === 'PAYPAL' && getLanguageValue(CheckoutLanguage, 'PAYPAL', language))}
        </Price>
      </Right>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
`;
const Price = styled.p``;

export default PaymentMethod;
