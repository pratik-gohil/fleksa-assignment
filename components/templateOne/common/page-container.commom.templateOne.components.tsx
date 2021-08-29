import React, { FunctionComponent } from 'react';
import Main from './main/main.common.templateOne.components';
import NavbarMobile from './navbarMobile/navbar-mobile.common.templateOne.components';
import NavbarDesktop from './navbarDesktop/navbar-desktop.common.templateOne.components';
import Footer from './footer/footer.common.templateOne.components';
import Cart from './cart/cart.common.templateOne.components';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { BREAKPOINTS } from '../../../constants/grid-system-configuration';

export interface IPropsPageContainer {
  showFooter?: boolean;
}

const Wrapper = styled.div<{ showFooter: boolean }>`
  position: relative;
  padding-bottom: ${(p) => (p.showFooter ? '8rem' : '0')};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding-bottom: 0;
  }
`;

const AllPagesCartContainer = styled.div`
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`;

const PageContainer: FunctionComponent<IPropsPageContainer> = ({ children, showFooter = true }) => {
  return (
    <Wrapper showFooter={showFooter}>
      <NavbarDesktop />

      <Main>{children}</Main>

      {showFooter && <Footer />}

      <NavbarMobile />

      <AllPagesCartContainer>
        <Cart />
      </AllPagesCartContainer>

      <ReactTooltip />
    </Wrapper>
  );
};

export default PageContainer;
