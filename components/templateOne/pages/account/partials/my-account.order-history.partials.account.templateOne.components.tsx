import React, { FunctionComponent } from 'react';
import { IParticularOrder } from '../../../../../interfaces/common/customer.common.interfaces';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../../constants/grid-system-configuration';

const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  @media (min-width: 850px) {
    max-width: 700px;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 1rem 0.5rem;
  }
`;
const TextContainer = styled.div`
  border-bottom: none;

  padding: 1em 2em 3em 2em;
  display: flex;
  justify-content: space-between;

  & > * {
    display: flex;
    flex-direction: column;
  }
`;
const Left = styled.div``;
const OrderId = styled.a`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  font-weight: 700;
  margin-bottom: 0.5em;
  text-decoration: none;
`;
const Type = styled.p`
  color: ${(p) => p.theme.textDarkColor};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.4em;
  padding: 0;
  margin: 0;
`;
const Quantity = styled(Type)``;
// const Status = styled(Type)``;
const Right = styled.div`
  align-items: center;
`;
const Price = styled.h2`
  color: ${(p) => p.theme.primaryColor};
  font-size: 2rem;
  font-size: 700;
  padding: 0;
  margin: 0;
`;
const TimeDate = styled(Type)``;
const Dot = styled.span`
  font-size: 1.5rem;
  margin: 0 0.1em;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.a`
  background-color: white;
  border: 1px solid ${(p) => p.theme.textDarkColor};
  color: ${(p) => p.theme.textDarkColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1em;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-decoration: none;

  &:first-of-type {
    border-bottom-left-radius: 10px;
  }
  &:last-of-type {
    border-bottom-right-radius: 10px;
  }

  &:nth-child(2):hover {
    filter: brightness(1.3);
  }
`;
const Receipt = styled.a<{ back: string }>`
  background-color: ${(p) => (p.back ? p.theme.textDarkColor : 'white')};
  border: 1px solid ${(p) => p.theme.textDarkColor};
  color: ${(p) => (!p.back ? p.theme.textDarkColor : 'white')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1em;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  border-bottom-right-radius: 10px;
`;

interface IMyAccountOrderProps {
  order: IParticularOrder;
}

export const MyAccountOrder: FunctionComponent<IMyAccountOrderProps> = ({ order }) => {
  const customDate = new Date(`${order.created_at}`);

  return (
    <Container>
      <TextContainer>
        <Left>
          <OrderId href={`/account/order/${order.id}`}>Order #{order.id}</OrderId>
          <Type>{order.order_type}</Type>
          <Quantity>{order.no_of_products} items</Quantity>
          {/* <Status>{order.payment_status ? order.payment_status :  'UNPAID' }</Status> */}
        </Left>
        <Right>
          <Price>&euro; {order.amount.toFixed(2).replace('.', ',')}</Price>
          <TimeDate>
            {customDate.toLocaleString('default', {
              hour12: false,
              timeStyle: 'short',
            })}
            <Dot>.</Dot>
            {customDate.toLocaleString('default', { dateStyle: 'medium' })}
          </TimeDate>
        </Right>
      </TextContainer>

      <ButtonContainer>
        <Button href={`/account/order/${order.id}`}>Review Now</Button>
        <Receipt target="_blank" rel="noopener noreferrer" back="fill" href={order?.pdf_url}>
          View Receipt
        </Receipt>
      </ButtonContainer>
    </Container>
  );
};
