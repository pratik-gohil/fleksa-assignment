import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import MyAccountAllAddressLeftSide from './partials/my-account.all-address.left.partials.account.pages.templateOne.components';

const Wrapper = styled.section`
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  display: flex;
  margin: auto 1rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: calc(100vh - ${(p) => p.theme.navMobile.height}px);
  }
`;

const LeftWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 50%;
  flex-direction: column;
  padding: 0 2rem 0 1rem;
`;

const RightWrapper = styled.div`
  position: relative;
  height: 100%;
  background: red;

  ::after {
    content: '';
    width: 1rem;
    height: 100%;
    position: absolute;
    background: ${(p) => p.theme.primaryColor};
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

const AccountPageAllAddress: FunctionComponent = ({}) => {
  return (
    <Wrapper>
      <LeftWrapper>
        <MyAccountAllAddressLeftSide />
      </LeftWrapper>

      <RightWrapper></RightWrapper>
    </Wrapper>
  );
};

export default AccountPageAllAddress;
