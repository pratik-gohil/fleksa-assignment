import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';
import DateTimePartial from './partials/particular-order/DateTime.particular-order.partial';
import ProductsPartialOrder from './partials/particular-order/Products.particular-order.partial';
import DeliveryAddressParticularOrder from './partials/particular-order/DeliveryAddress.particular-order.partials';

const WrapperSection = styled.section`
  flex: 1;
  background-color: white;

  @media (min-width: 850px) {
    padding: 3em 0;
    height: ${(p) => `calc(100vh - ${p.theme.navDesktop.height}px)`};
    overflow: scroll;
  }

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const Container = styled.div`
  max-width: 1000px;

  @media (min-width: 1200px) {
    display: flex;
    gap: 2em;

    & > * {
      flex: 1;
    }
  }
`;

const RightContainer = styled.div``;
const LeftContainer = styled.div``;

const AccountPageParticularOrder: FunctionComponent = ({}) => {
  const customerData = useAppSelector(selectCustomer);

  return (
    <WrapperSection>
      <Container>
        <LeftContainer>
          <DateTimePartial created_at={customerData.current_order?.created_at} />

          <ProductsPartialOrder products={customerData.current_order?.products || []} />
        </LeftContainer>
        <RightContainer>
          {customerData.current_order?.is_delivery && (
            <DeliveryAddressParticularOrder
              delivery_address={`${customerData.current_order?.delivery_address?.address},${customerData.current_order?.delivery_address?.city}`}
            />
          )}
        </RightContainer>
      </Container>
    </WrapperSection>
  );
};

export default AccountPageParticularOrder;
