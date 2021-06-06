import { FunctionComponent } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectShop } from "../../../../redux/slices/index.slices.redux";
import { Col, Container, Row } from "react-grid-system";
import NavLink from "./nav-link.common.templateOne.components";

const WrapperHeader = styled.header`
  height: ${props => props.theme.navDesktop.height}px;
  background: ${props => props.theme.navDesktop.backgroundColor};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: ${props => props.theme.border};
  z-index: 10;
`

const Logo = styled.img`
  padding: ${props => props.theme.dimen.X2}px 0;
  height: ${props => props.theme.navDesktop.height}px;
`

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${props => props.theme.navDesktop.height}px;
`

const NavbarList = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  padding: 0;
  margin: 0;
`

const NavbarDesktop: FunctionComponent = ({ }) => {

  const shopData = useAppSelector(selectShop)

  return <WrapperHeader>
    <Container>
      <Row>
        <Col>
          <a href="/">
            {shopData?.logo && <Logo src={shopData?.logo} loading="lazy" />}
          </a>
        </Col>
        <Col>
          <Navbar>
            <NavbarList>
              <NavLink title="MENU" path="/menu" />
              <NavLink title="RESERVATION" path="/reservation" />
              <NavLink title="GALLERY" path="/gallery" />
              <NavLink title="CONTACT" path="/contact" />
              <NavLink title="LOGIN" path="/login" />
            </NavbarList>
          </Navbar>
        </Col>
      </Row>
    </Container>
  </WrapperHeader>
}

export default NavbarDesktop