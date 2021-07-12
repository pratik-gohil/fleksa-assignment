import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../../../../redux/hooks.redux";
import { ICartItem, updateAddProduct, updateReduceProduct } from "../../../../redux/slices/cart.slices.redux";

import SvgButtonPlus from "../../../../public/assets/svg/button-plus.svg"
import SvgButtonMinus from "../../../../public/assets/svg/button-minus.svg"

export interface IPropsCartAddRemoveButton {
  cartItem: ICartItem
}

const Wrapper = styled.div`
  display: flex;
  align-self: center;
  width: 70px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Add = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  cursor: pointer;
  font-weight: 700;
  svg {
    width: 24px;
    height: 24px;
    fill: rgb(255, 209, 0);
  }
`

const Reduce = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  cursor: pointer;
  font-weight: 700;
  svg {
    width: 24px;
    height: 24px;
    fill: rgb(255, 209, 0);
  }
`

const QuantityCount = styled.div``

const CartAddRemoveButton: FunctionComponent<IPropsCartAddRemoveButton> = ({ cartItem }) => {
  const dispatch = useAppDispatch()

  return <Wrapper>
    <Reduce onClick={() => dispatch(updateReduceProduct({ cartId: cartItem.cartId }))}><SvgButtonMinus /></Reduce>
    <QuantityCount>{cartItem.quantity}</QuantityCount>
    <Add onClick={() => dispatch(updateAddProduct({ cartId: cartItem.cartId }))}><SvgButtonPlus /></Add>
  </Wrapper>
}

export default CartAddRemoveButton