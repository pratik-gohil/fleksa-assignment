import { FunctionComponent } from "react";
import styled from "styled-components";

const WrapperMain = styled.main`
  margin-top: ${props => props.theme.navDesktop.height}px;
`

const Main: FunctionComponent = ({ children }) => {
  return <WrapperMain>
    {children}
  </WrapperMain>
}

export default Main