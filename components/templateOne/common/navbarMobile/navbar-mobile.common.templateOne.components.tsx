import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";
import SvgMenu from "../../../../public/assets/svg/menu.svg";
import SvgCart from "../../../../public/assets/svg/cart.svg";
import SvgHome from "../../../../public/assets/svg/home.svg";
import SvgOptions from "../../../../public/assets/svg/options.svg";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectShowCart, updateShowCart } from "../../../../redux/slices/configuration.slices.redux";

const WrapperHeader = styled.header`
  height: ${props => props.theme.navMobile.height}px;
  background: ${props => props.theme.navMobile.backgroundColor};
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: ${props => props.theme.border};
  z-index: 10;
  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`

const List = styled.ul`
  display: flex;
  flex: 1 1 auto;
  height: inherit;
  flex-direction: row;
  justify-content: space-between;
`

const ListItem = styled.li`
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
    fill: ${props => props.theme.primaryColor};
  }
`

const Title = styled.p`
  color: ${props => props.theme.primaryColor};
  font-size: 12px;
  padding: 0;
  margin: 4px 0 0 0;
  line-height: 1;
`

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
`

const Link = styled.a`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const NavbarMobile: FunctionComponent = ({ }) => {
  const showCart = useAppSelector(selectShowCart)
  const dispach = useAppDispatch()
  
  const toggleCart = () => dispach(updateShowCart(!showCart))

  const toggleOptions = () => undefined 

  return <WrapperHeader>
    <List>
      {[{
        title: "Home",
        link: "/",
        icon: SvgHome
      }, {
        title: "Menu",
        link: "/menu",
        icon: SvgMenu
      }, {
        title: "Cart",
        button: toggleCart,
        icon: SvgCart
      }, {
        title: "Options",
        button: toggleOptions,
        icon: SvgOptions
      }].map((item, index) => {
        const view = <>
          {item.icon && <item.icon />}
          <Title>{item.title}</Title>
        </>
        return <ListItem key={index}>
          {item.link? (
            <Link href={item.link}>{view}</Link>
          ): (
            <Button onClick={item.button}>{view}</Button>
          )}
        </ListItem>
      })}
    </List>
  </WrapperHeader>
}

export default NavbarMobile