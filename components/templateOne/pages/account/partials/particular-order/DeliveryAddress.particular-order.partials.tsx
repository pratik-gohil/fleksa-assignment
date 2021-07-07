import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Left from './Left';
import Right from './Right';
import Container from './Container.particular-order.partial';

interface IDeliveryAddressParticularOrderProps {
  delivery_address: string;
}

const DeliveryAddressParticularOrder: FunctionComponent<IDeliveryAddressParticularOrderProps> = ({ delivery_address }) => {
  return (
    <Container>
      <Left>
        <Title>Delivery Address</Title>
      </Left>
      <Right>
        <Address>{delivery_address}</Address>
      </Right>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
`;
const Address = styled.p`
  text-align: right;
  max-width: 200px;
`;

export default DeliveryAddressParticularOrder;
