import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';
import { MyAccountOrder } from './partials/my-account.order.partials.account.templateOne.components';

const Wrapper = styled.div`
  overflow: hidden;
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
`;

const InnerWrapper = styled.div`
  overflow-x: hidden;
  height: 100%;
`;

export const MyAccountAllOrderHistory = () => {
  const customerData = useAppSelector(selectCustomer);

  return (
    <Wrapper>
      <InnerWrapper>
        {customerData.orders?.map((order) => (
          <MyAccountOrder key={order.id} order={order} />
        ))}
      </InnerWrapper>
    </Wrapper>
  );
};