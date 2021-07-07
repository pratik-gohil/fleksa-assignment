import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../../../../redux/hooks.redux";
import { ICartItem, updateAddProduct, updateReduceProduct } from "../../../../redux/slices/cart.slices.redux";

export interface IPropsCartAddRemoveButton {
  cartItem: ICartItem
}

const Wrapper = styled.div`
  display: flex;
  background-color: ${props => props.theme.primaryColor};
  align-self: center;
  width: 70px;
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.theme.borderRadius}px;
  overflow: hidden;
  border: ${props => props.theme.border};
`

const Add = styled.div`
  display: flex;
  flex: 1;
  padding: 4px 12px;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const Reduce = styled.div`
  display: flex;
  flex: 1;
  padding: 4px 12px;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const QuantityCount = styled.div``

const CartAddRemoveButton: FunctionComponent<IPropsCartAddRemoveButton> = ({ cartItem }) => {
  const dispatch = useAppDispatch()

  return <Wrapper>
    <Reduce onClick={() => dispatch(updateReduceProduct({ cartId: cartItem.cartId }))}>-</Reduce>
    <QuantityCount>{cartItem.quantity}</QuantityCount>
    <Add onClick={() => dispatch(updateAddProduct({ cartId: cartItem.cartId }))}>+</Add>
  </Wrapper>
}

export default CartAddRemoveButton