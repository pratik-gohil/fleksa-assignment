import { useEffect, useState } from 'react';
import { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { ICategoryProduct } from '../../../../interfaces/common/category.common.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectCartItemByCartId, updateAddProduct, updateReduceProduct } from '../../../../redux/slices/cart.slices.redux';
import { selectItemSelectionByTopProductId } from '../../../../redux/slices/item-selection.slices.redux';

import SvgButtonPlus from '../../../../public/assets/svg/button-plus.svg';
import SvgButtonMinus from '../../../../public/assets/svg/button-minus.svg';
import CustomLink from '../amplitude/customLink';
import { selectIsReOrder, selectPromoCode, updateCheckoutIsReOrder, updatePromoCode } from '../../../../redux/slices/checkout.slices.redux';

export interface IPropsAddButton {
  hasImage: boolean;
  isOpen: boolean;
  canOpen: boolean;
  product: ICategoryProduct;
  setOpenItemId(id: number | undefined): void;
}

interface IPropsWrapperButton {
  hasImage: boolean;
  isOpen: boolean;
}

const WrapperButton = styled.div<IPropsWrapperButton>`
  display: flex;
  z-index: 0;
  ${(props) =>
    !props.hasImage &&
    css`
      flex: 1 1 auto;
    `}
  ${(props) =>
    props.hasImage &&
    (props.isOpen
      ? css`
          margin-top: -60px;
        `
      : css`
          margin-top: -12px;
        `)}
  transition-duration: 500ms;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  width: 86px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 209, 0);
  border-radius: ${(props) => props.theme.borderRadius}px;
  align-self: center;
  font-weight: 700;
  transition-duration: 500ms;
  overflow: hidden;
  & > * {
    width: 100%;
    text-align: center;
  }
`;

const Separator = styled.div`
  display: block;
  height: 100%;
  width: 2px;
  background: rgba(255, 255, 255, 0.4);
`;

const ButtonItem = styled.a`
  display: flex;
  flex: 1;
  height: inherit;
  justify-content: center;
  align-items: center;
  margin: 0;
  justify-content: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  svg {
    width: 24px;
    height: 24px;
    fill: #222;
  }
`;

const AddButton: FunctionComponent<IPropsAddButton> = ({ setOpenItemId, product, canOpen, hasImage, isOpen }) => {
  const [lastCartId, setLastCartId] = useState<string | null>(null);
  const selectionData = useAppSelector((state) => selectItemSelectionByTopProductId(state, product.id));
  const cartData = useAppSelector((state) => selectCartItemByCartId(state, lastCartId));
  const isReOrder = useAppSelector(selectIsReOrder);
  const promoCodeData = useAppSelector(selectPromoCode);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectionData?.cartId) setLastCartId(selectionData.cartId);
    else setLastCartId(`${product.id}||`);
  }, [selectionData, product]);

  function addItemToCart() {
    // ? Update reorder state if it's
    if (isReOrder) dispatch(updateCheckoutIsReOrder(false));

    // ? Reset promo code if it's applied
    if (promoCodeData) dispatch(updatePromoCode(null));

    if (selectionData) {
      dispatch(
        updateAddProduct({
          topProductId: product.id,
          cartId: selectionData.cartId,
          productId: selectionData.productId,
          sideProducts: selectionData.sideProducts,
          choice: selectionData.choice,
          mainName: selectionData.mainName,
          partName: selectionData.partName,
          type: selectionData.type,
          totalCost: selectionData.totalCost,
          isAvailable: true, // ? Default by menu item
        }),
      );

      setOpenItemId(undefined);
    }

    if (!canOpen) {
      dispatch(
        updateAddProduct({
          topProductId: product.id,
          cartId: `${product.id}||`,
          productId: product.id,
          sideProducts: null,
          choice: null,
          type: product.type_,
          totalCost: product.price,
          mainName: product.name_json,
          isAvailable: true, // ? Default by menu item
        }),
      );
      setOpenItemId(undefined);
    }
  }

  function reduceItemFromCart() {
    if ((!canOpen || (canOpen && isOpen)) && lastCartId) dispatch(updateReduceProduct({ cartId: lastCartId }));
  }

  return (
    <WrapperButton
      onClick={(e) => {
        if (!canOpen || (canOpen && isOpen)) e.stopPropagation();
      }}
      hasImage={hasImage}
      isOpen={isOpen}
    >
      {!isOpen && (
        <ButtonContainer>
          <CustomLink
            amplitude={{
              type: 'button',
              text: `ADD${canOpen && ' EXPANDABLE'}`,
              eventProperties: {
                product,
                canOpen,
                hasImage,
                isOpen,
                cartData,
              },
            }}
            callback={addItemToCart}
            placeholder={`ADD`}
          />
        </ButtonContainer>
      )}
    </WrapperButton>
  );
};

export default AddButton;
