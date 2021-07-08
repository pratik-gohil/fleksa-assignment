import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';

const Wrapper = styled.section`
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  display: flex;
  flex-direction: column;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: calc(100vh - ${(p) => p.theme.navMobile.height}px);
  }
`;

const AccountPageAllAddress: FunctionComponent = ({}) => {
  return <Wrapper>My all address</Wrapper>;
};

export default AccountPageAllAddress;
