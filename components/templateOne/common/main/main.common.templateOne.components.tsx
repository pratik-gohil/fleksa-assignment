import { FunctionComponent } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

const WrapperMain = styled.main`
  margin-top: 0;
  @media (min-width: ${BREAKPOINTS.md}px) {
    margin-top: ${props => props.theme.navDesktop.height}px;
  }
`

const Main: FunctionComponent = ({ children }) => {
  return <WrapperMain>
    {children}
  </WrapperMain>
}

export default Main