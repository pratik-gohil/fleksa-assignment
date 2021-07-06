import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectShop } from '../../../../redux/slices/index.slices.redux';
import { Col, Container, Row } from 'react-grid-system';
import NavLink from './nav-link.common.templateOne.components';
import { useTranslation } from 'next-i18next';
import NavLanguageChange from './nav-language-change.templateOne.components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { selectIsUserLoggedIn } from '../../../../redux/slices/user.slices.redux';
import NavUserProfile from './nav-profile-image.templateOne.components';
import { useRouter } from 'next/router';

const WrapperHeader = styled.header`
  display: none;
  height: ${(props) => props.theme.navDesktop.height}px;
  background: ${(props) => props.theme.navDesktop.backgroundColor};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: ${(props) => props.theme.border};
  z-index: 10;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`;

const Logo = styled.img`
  padding: 2px 0;
  margin-left: 1rem;
  height: ${(props) => props.theme.navDesktop.height}px;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: flex-end;
  height: ${(props) => props.theme.navDesktop.height}px;
`;

const NavbarList = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

const NavbarDesktop: FunctionComponent = ({}) => {
  const { t } = useTranslation('header');
  const shopData = useAppSelector(selectShop);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const router = useRouter();

  return (
    <WrapperHeader>
      <Container fluid>
        <Row>
          <Col md={4}>
            <a href="/">{shopData?.logo && <Logo src={shopData?.logo} loading="lazy" />}</a>
          </Col>

          <Col md={8}>
            <Navbar>
              <NavbarList>
                <NavLink title={t('@menu')} path="/menu" isActive={router.pathname === '/menu'} />
                <NavLink title={t('@reservation')} path="/reservation" isActive={router.pathname === '/reservation'} />
                <NavLink title={t('@gallery')} path="/gallery" isActive={router.pathname === '/gallery'} />
                <NavLink title={t('@contact')} path="/contact-us" isActive={router.pathname === '/contact-us'} />
                {isLoggedIn ? <NavUserProfile /> : <NavLink title={t('@login')} path="/login" isActive={router.pathname === '/login'} />}
                <NavLanguageChange />
              </NavbarList>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </WrapperHeader>
  );
};

export default NavbarDesktop;
