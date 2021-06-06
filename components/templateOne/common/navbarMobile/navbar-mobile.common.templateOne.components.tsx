import { FunctionComponent } from "react";
import styled from "styled-components";

const WrapperHeader = styled.header`
  height: ${props => props.theme.navMobile.height}px;
  background: ${props => props.theme.navMobile.backgroundColor};
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: ${props => props.theme.border};
  z-index: 10;
`

const NavbarMobile: FunctionComponent = ({ }) => {
  return <WrapperHeader>

  </WrapperHeader>
}

export default NavbarMobile