import { useRouter } from "next/dist/client/router";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectCart } from "../../../../redux/slices/cart.slices.redux";
import { selectLanguage, selectShowCart, updateShowLogin } from "../../../../redux/slices/configuration.slices.redux";
import { selectIsUserLoggedIn } from "../../../../redux/slices/user.slices.redux";
import CartAddRemoveButton from "./add-remove.cart.common.templateOne.components";
import SvgCartEmpty from "../../../../public/assets/svg/cart-empty.svg";
import { useEffect } from "react";
import { useState } from "react";
import LoginAllPages from "../login/login.common.templateOne.components";

const Wrapper = styled.div<{ showCart: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: ${props => props.theme.navMobile.height}px;
  flex-direction: column;
  flex: 1;
  background: #fff;
  display: ${props => props.showCart? "flex": "none"};
  z-index: 1;
  padding: 0 ${props => props.theme.dimen.X4}px;
  max-height: 100vh;
  overflow: auto;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    bottom: 0;
    padding: 0;
    margin: 0;
    position: relative;
    display: flex;
    max-height: calc(100vh - ${props => props.theme.navDesktop.height}px);
  }
`

const Title = styled.h3`
  text-align: center;
  font-size: 26px;
  margin: 0 -12px ${props => props.theme.dimen.X4}px -12px;
  padding: ${props => props.theme.dimen.X4}px;
  background-color: #f9f9f9;
  border-bottom: ${props => props.theme.border};
  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin: 0;
    background-color: transparent;
  }
`

const List = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
`

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ItemTitle = styled.p`
  font-size: 16px;
  margin: ${props => props.theme.dimen.X4}px 0;
  span {
    font-size: 12px;
  }
`

const OrderButton = styled.p<{ isActive: boolean }>`
  background-color: ${props => props.isActive? "#222": "#aaa"};
  color: #fff;
  padding: ${props => props.theme.dimen.X4}px;
  margin: 0 0 ${props => props.theme.dimen.X4}px 0;
  border-radius: ${props => props.theme.borderRadius}px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
`

const Column1 = styled.div`
  flex: 8;
`

const Column2 = styled.div`
`

const Column3 = styled.div`
  flex: 3;
  justify-content: flex-end;
  display: flex;
  flex-shrink: 0;
`

const Price = styled.p`
  display: flex;
  flex-shrink: 0;
  margin: ${props => props.theme.dimen.X4}px 0;
  font-weight: 600;
  text-align: right;
`

const CartCost = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  border-top: ${props => props.theme.border};
  font-weight: 600;
`

const CartEmptyContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  margin-top: ${props => props.theme.dimen.X4*2}px;
`

const TextFeelingHungry = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin: ${props => props.theme.dimen.X4}px 0 0 0;
`

const TextChooseDishes = styled(TextFeelingHungry)`
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 ${props => props.theme.dimen.X4}px 0;
`

const Cart: FunctionComponent = ({}) => {
  const router = useRouter()
  const [ cartItemKeys, setCartItemKeys ] = useState<Array<string>>([])
  const showCart = useAppSelector(selectShowCart)
  const language = useAppSelector(selectLanguage)
  const cartData = useAppSelector(selectCart)
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    setCartItemKeys(cartData.items? Object.keys(cartData.items): [])
  }, [ cartData ])

  function onClickOrderButton() {
    if (cartItemKeys.length > 0) {
      isLoggedIn? router.push("/checkout"): dispatch(updateShowLogin(true))
    }
  }

  return <Wrapper showCart={showCart}>
    <Title>Your Cart</Title>
    <List>
      {cartItemKeys.length > 0? <>
        {cartItemKeys.map(key => {
          const cartItem = cartData.items[key]
          return cartItem && <ListItem key={key}>
            <Column1>
              <ItemTitle>{cartItem.mainName[language]} <span>{cartItem.partName && "(" + cartItem.partName[language] + ")"}</span></ItemTitle>
            </Column1>
            <Column2>
              <CartAddRemoveButton cartItem={cartItem} />
            </Column2>
            <Column3>
              <Price>€ {cartItem.totalCost.toFixed(2)}</Price>
            </Column3>
          </ListItem>
        })}
        <ListItem key="info-cart">
          <CartCost>
            <ItemTitle>Total</ItemTitle>
            <Price>€{cartData.cartCost.toFixed(2)}</Price>
          </CartCost>
        </ListItem>
      </>: <ListItem key="empty-cart">
        <CartEmptyContainer>
            <SvgCartEmpty />
            <TextFeelingHungry>Feeling hungry?</TextFeelingHungry>
            <TextChooseDishes>Choose delicious dishes from the menu to place an order.</TextChooseDishes>
        </CartEmptyContainer>
      </ListItem>}
    </List>

    <OrderButton isActive={cartItemKeys.length > 0} onClick={onClickOrderButton}>ORDER</OrderButton>

    <LoginAllPages callback={() => router.push("/checkout")} />
  </Wrapper>
}

export default Cart