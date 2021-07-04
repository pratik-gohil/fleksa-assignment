import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';

const WrapperMain = styled.main`
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.navMobile.height}px;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-top: ${(props) => props.theme.navDesktop.height}px;
    margin-bottom: 0;
  }
`;

const Main: FunctionComponent = ({ children }) => {
  return <WrapperMain>{children}</WrapperMain>;
};

export default Main;
