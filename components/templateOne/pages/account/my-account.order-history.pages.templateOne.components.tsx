import React from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomerOrderHistory } from '../../../../redux/slices/user.slices.redux';
import { MyAccountOrder } from './partials/my-account.order-history.partials.account.templateOne.components';
import MobileBackButton from '../../common/backButton/backButton.common.templateOne.components';

const Wrapper = styled.div`
  overflow: hidden;
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);

  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: calc(100vh - ${(p) => p.theme.navMobile.height}px);
  }
`;

const InnerWrapper = styled.div`
  overflow-x: hidden;
  height: 100%;
`;

export const MyAccountAllOrderHistory = () => {
  const customerOrderHistory = useAppSelector(selectCustomerOrderHistory);

  return (
    <Wrapper>
      <InnerWrapper>
        <MobileBackButton path="/account" />

        {!!customerOrderHistory && customerOrderHistory.map((order) => <MyAccountOrder key={order.id} order={order} />)}
      </InnerWrapper>
    </Wrapper>
  );
};
