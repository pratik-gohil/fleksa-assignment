import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import SvgMenu from '../../../../public/assets/svg/menu.svg';
import SvgCart from '../../../../public/assets/svg/cart.svg';
import SvgHome from '../../../../public/assets/svg/home.svg';
import SvgOptions from '../../../../public/assets/svg/options.svg';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguageCode, selectSelectedMenu, selectShowCart, updateShowCart } from '../../../../redux/slices/configuration.slices.redux';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import NavbarMobileOptions from './navbar-mobile-options.common.templateOne.components';

const WrapperHeader = styled.header`
  height: ${(props) => props.theme.navMobile.height}px;
  background: ${(props) => props.theme.navMobile.backgroundColor};
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: ${(props) => props.theme.border};
  z-index: 10;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`;

const List = styled.ul`
  display: flex;
  flex: 1 1 auto;
  height: inherit;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
`;

const ListItem = styled.li<{ isActive: boolean }>`
  display: flex;
  flex: 1 1 auto;
  height: inherit;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    width: 28px;
    height: 28px;
    display: block;
    fill: ${(props) => (props.isActive ? props.theme.primaryColor : '#fff')};
  }
`;

const Title = styled.p<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? props.theme.primaryColor : '#fff')};
  font-size: 12px;
  padding: 0;
  margin: 4px 0 0 0;
  line-height: 1;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Link = styled.a`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const NavbarMobile: FunctionComponent = ({}) => {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const selectedMenuId = useAppSelector(selectSelectedMenu);
  const showCart = useAppSelector(selectShowCart);
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector(selectLanguageCode);

  const toggleCart = () => dispatch(updateShowCart(!showCart));
  const toggleOptions = () => setShowOptions(!showOptions);

  return (
    <WrapperHeader>
      <List>
        {[
          {
            title: 'Home',
            link: `/${languageCode}/`,
            icon: SvgHome,
            isActive: !showOptions && !showCart && router.pathname === '/',
          },
          {
            title: 'Menu',
            link: selectedMenuId ? `/${languageCode}/menu/${selectedMenuId}` : '/menu',
            icon: SvgMenu,
            isActive: !showOptions && !showCart && router.pathname.startsWith('/menu'),
          },
          {
            title: 'Cart',
            button: toggleCart,
            icon: SvgCart,
            isActive: showCart,
          },
          {
            title: 'Options',
            button: toggleOptions,
            icon: SvgOptions,
            isActive: showOptions,
          },
        ].map((item, index) => {
          const view = (
            <>
              {item.icon && <item.icon />}
              <Title isActive={item.isActive}>{item.title}</Title>
            </>
          );

          return (
            <ListItem key={index} isActive={item.isActive}>
              {item.link ? <Link href={item.link}>{view}</Link> : <Button onClick={item.button}>{view}</Button>}
            </ListItem>
          );
        })}
      </List>
      <NavbarMobileOptions isOpen={showOptions} />
    </WrapperHeader>
  );
};

export default NavbarMobile;
