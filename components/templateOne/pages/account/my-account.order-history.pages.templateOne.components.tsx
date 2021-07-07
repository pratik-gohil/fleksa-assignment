import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';
import { MyAccountOrder } from './partials/my-account.order.partials.account.templateOne.components';

const Wrapper = styled.div``;

export const MyAccountAllOrderHistory = () => {
  const customerData = useAppSelector(selectCustomer);

  return (
    <Wrapper>
      {customerData.orders?.map((order) => (
        <MyAccountOrder key={order.id} order={order} />
      ))}
    </Wrapper>
  );
};
