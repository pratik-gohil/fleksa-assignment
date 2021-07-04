import React, { FunctionComponent } from 'react';
import Main from './main/main.common.templateOne.components';
import NavbarMobile from './navbarMobile/navbar-mobile.common.templateOne.components';
import NavbarDesktop from './navbarDesktop/navbar-desktop.common.templateOne.components';
import Footer from './footer/footer.common.templateOne.components';
import Cart from './cart/cart.common.templateOne.components';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../constants/grid-system-configuration';

export interface IPropsPageContainer {
  showFooter?: boolean;
}

const AllPagesCartContainer = styled.div`
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`;

const PageContainer: FunctionComponent<IPropsPageContainer> = ({ children, showFooter = true }) => {
  return (
    <>
      <NavbarDesktop />

      <Main>{children}</Main>

      {showFooter && <Footer />}

      <NavbarMobile />

      <AllPagesCartContainer>
        <Cart />
      </AllPagesCartContainer>
    </>
  );
};

export default PageContainer;
