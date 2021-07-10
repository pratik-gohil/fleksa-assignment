import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';

const Wrapper = styled.div`
  height: calc(100vh - ${(props) => props.theme.navMobile.height}px);
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100vh - ${(props) => props.theme.navDesktop.height}px);
  }
`;

const OffersPageTemplateOne: FunctionComponent = ({}) => {
  return <Wrapper>offer page</Wrapper>;
};

export default OffersPageTemplateOne;
