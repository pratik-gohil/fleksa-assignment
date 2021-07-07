import React from 'react';
import styled from 'styled-components';
import Left from './Left';
import Right from './Right';
import Container from './Container.particular-order.partial';
import { getLanguageValue } from '../../../functions/utilities';
import ProfileLanguage from '../../../constant/language/profile';
import { getLanguage } from '../../../redux/languageSlice';
import { useSelector } from 'react-redux';
import MenuLanguage from '../../../constant/language/menu';

const OrderType = ({ order_type }) => {
  const language = useSelector(getLanguage);

  return (
    <Container>
      <Left>
        <Title>{getLanguageValue(ProfileLanguage, 'Order Type', language)}</Title>
      </Left>
      <Right>
        <Text>
          {(order_type === 'PICKUP' && getLanguageValue(MenuLanguage, 'Takeaway', language)) ||
            (order_type === 'DELIVERY' && getLanguageValue(MenuLanguage, 'Delivery', language)) ||
            (order_type === 'DINE_IN' && getLanguageValue(MenuLanguage, 'Dine-in', language))}
        </Text>
      </Right>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
`;
const Text = styled.p``;

export default OrderType;
