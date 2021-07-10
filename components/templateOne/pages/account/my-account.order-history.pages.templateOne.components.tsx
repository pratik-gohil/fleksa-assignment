import React from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';
import { MyAccountOrder } from './partials/my-account.order-history.partials.account.templateOne.components';
import ArrowIconPath from '../../../../public/assets/svg/account/back-arrow.svg';

const Wrapper = styled.div`
  overflow: hidden;
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);

  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: calc(100vh - ${(p) => p.theme.navMobile.height}px);
  }
`;

const HeaderSection = styled.div`
  flex: 1;
  display: none;
  width: 100%;
  max-height: 50px;
  margin: 1rem;

  align-items: center;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: flex;
  }
`;

const BackButton = styled.a`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
const ArrowIcon = styled(ArrowIconPath)``;

const InnerWrapper = styled.div`
  overflow-x: hidden;
  height: 100%;
`;

export const MyAccountAllOrderHistory = () => {
  const customerData = useAppSelector(selectCustomer);

  return (
    <Wrapper>
      <InnerWrapper>
        <HeaderSection>
          <BackButton href="/account">
            <ArrowIcon />
          </BackButton>
        </HeaderSection>

        {customerData.orders?.map((order) => (
          <MyAccountOrder key={order.id} order={order} />
        ))}
      </InnerWrapper>
    </Wrapper>
  );
};
