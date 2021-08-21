import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useAppDispatch } from '../../../../redux/hooks.redux';
import { ICartItem, updateAddProduct, updateReduceProduct } from '../../../../redux/slices/cart.slices.redux';

import SvgButtonPlus from '../../../../public/assets/svg/button-plus.svg';
import SvgButtonMinus from '../../../../public/assets/svg/button-minus.svg';
import CustomLink from '../amplitude/customLink';

export interface IPropsCartAddRemoveButton {
  cartItem: ICartItem;
}

const Wrapper = styled.div`
  display: flex;
  align-self: center;
  width: 70px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

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
`;

const Reduce = styled.a`
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
`;

const QuantityCount = styled.div``;

const CartAddRemoveButton: FunctionComponent<IPropsCartAddRemoveButton> = ({ cartItem }) => {
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <CustomLink
        amplitude={{
          type: 'button',
          text: 'cart add',
        }}
        callback={() => dispatch(updateReduceProduct({ cartId: cartItem.cartId }))}
        Override={Reduce}
      >
        <SvgButtonMinus />
      </CustomLink>

      <QuantityCount>{cartItem.quantity}</QuantityCount>

      <CustomLink
        amplitude={{
          type: 'button',
          text: 'cart minus',
        }}
        callback={() => dispatch(updateAddProduct({ cartId: cartItem.cartId }))}
        Override={Add}
      >
        <SvgButtonPlus />
      </CustomLink>
    </Wrapper>
  );
};

export default CartAddRemoveButton;
