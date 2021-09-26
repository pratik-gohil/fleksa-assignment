import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { ICartItem, updateAddProduct, updateReduceProduct } from '../../../../redux/slices/cart.slices.redux';

import SvgButtonPlus from '../../../../public/assets/svg/button-plus.svg';
import SvgButtonMinus from '../../../../public/assets/svg/button-minus.svg';
import CustomLink from '../amplitude/customLink';
import { selectPromoCode, updatePromoCode } from '../../../../redux/slices/checkout.slices.redux';

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
  const promoCodeData = useAppSelector(selectPromoCode);

  const dispatch = useAppDispatch();

  /**
   *
   * @param action type of remove
   * @param id cart id of the item
   */
  const handleAddOrRemoveProduct = async (action: string, id: string) => {
    // ? Reset promo code if it's applied
    if (promoCodeData) dispatch(updatePromoCode(null));

    switch (action) {
      case 'ADD':
        dispatch(updateReduceProduct({ cartId: id }));
        break;
      case 'REMOVE':
        dispatch(updateAddProduct({ cartId: id }));
        break;
    }
  };

  return (
    <Wrapper>
      <CustomLink
        amplitude={{
          type: 'button',
          text: 'cart add',
        }}
        callback={async () => await handleAddOrRemoveProduct('ADD', cartItem.cartId)}
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
        callback={async () => await handleAddOrRemoveProduct('REMOVE', cartItem.cartId)}
        Override={Add}
      >
        <SvgButtonPlus />
      </CustomLink>
    </Wrapper>
  );
};

export default CartAddRemoveButton;
