import { useRouter } from "next/dist/client/router";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectCart } from "../../../../redux/slices/cart.slices.redux";
import { selectLanguage, updateShowLogin } from "../../../../redux/slices/configuration.slices.redux";
import { selectIsUserLoggedIn } from "../../../../redux/slices/user.slices.redux";
import CartAddRemoveButton from "./add-remove.cart.common.templateOne.components";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  flex: 1;
  display: none;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    position: relative;
    display: flex;
  }
`

const Title = styled.h3``

const List = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ItemTitle = styled.p`
  font-size: 16px;
`

const OrderButton = styled.p`
  background-color: #222;
  color: #fff;
  padding: ${props => props.theme.dimen.X4}px;
  margin: ${props => props.theme.dimen.X4*2}px 0;
  border-radius: ${props => props.theme.borderRadius}px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
`

const OrderInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Price = styled.p`
  margin-left: 8px;
  font-weight: 700;
`

const CartCost = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: ${props => props.theme.border};
  font-weight: 700;
`

const Cart: FunctionComponent = ({}) => {
  const router = useRouter()
  const language = useAppSelector(selectLanguage)
  const cartData = useAppSelector(selectCart)
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn)
  const dispach = useAppDispatch()

  return <Wrapper>
    <Title>Your Cart</Title>
    <List>
      {cartData.items && Object.keys(cartData.items).map(key => {
        const cartItem = cartData.items[key]
        return <ListItem key={key}>
          <ItemTitle>{cartItem.mainName[language]} {cartItem.partName && "(" + cartItem.partName[language] + ")"}</ItemTitle>
          <OrderInfoContainer>
            <CartAddRemoveButton cartItem={cartItem} />
            <Price>€ {cartItem.totalCost}</Price>
          </OrderInfoContainer>
        </ListItem>
      })}
    </List>
    <CartCost>
      <ItemTitle>Total</ItemTitle>
      <Price>€{cartData.cartCost}</Price>
    </CartCost>
    <OrderButton onClick={() => isLoggedIn? router.push("/checkout"): dispach(updateShowLogin(true))}>ORDER</OrderButton>
  </Wrapper>
}

export default Cart