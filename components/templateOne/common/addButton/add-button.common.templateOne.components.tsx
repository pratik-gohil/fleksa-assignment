import { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { ICategoryProduct } from "../../../../interfaces/common/category.common.interfaces";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectCartItemByCartId, updateAddProduct, updateReduceProduct } from "../../../../redux/slices/cart.slices.redux";
import { selectItemSelectionByTopProductId } from "../../../../redux/slices/item-selection.slices.redux";

export interface IPropsAddButton {
  hasImage: boolean
  isOpen: boolean
  canOpen: boolean
  product: ICategoryProduct
}

interface IPropsWrapperButton {
  hasImage: boolean
  isOpen: boolean
}

const WrapperButton = styled.div<IPropsWrapperButton>`
  display: flex;
  z-index: 0;
  ${props => !props.hasImage && css`
    flex: 1 1 auto;
  `}
  ${props => props.hasImage && (props.isOpen? css`
    margin-top: -60px;
  `: css`
    margin-top: -12px;
  `)}
  transition-duration: 500ms;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 86px;
  background-color: rgb(255, 209, 0);
  border-radius: ${props => props.theme.borderRadius}px;
  align-self: center;
  font-weight: 700;
  transition-duration: 500ms;
  overflow: hidden;
`

const Separator = styled.div`
  display: block;
  height: 100%;
  width: 2px;
  background: rgba(0, 0, 0, 0.4);
`

const ButtonItem = styled.p`
  display: flex;
  flex: 1;
  padding: 4px 0;
  margin: 0;
  justify-content: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const AddButton: FunctionComponent<IPropsAddButton> = ({ product, canOpen, hasImage, isOpen }) => {

  const [ lastCartId, setLastCartId ] = useState<string|null>(null)
  const selectionData = useAppSelector(state => selectItemSelectionByTopProductId(state, product.id))
  const cartData = useAppSelector(state => selectCartItemByCartId(state, lastCartId))  
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectionData?.cartId) {
      setLastCartId(selectionData.cartId)
    } else {
      setLastCartId(`${product.id}||`)
    }
  }, [ selectionData, product ])

  function addItemToCart() {
    if ((canOpen && isOpen) && selectionData) {
      dispatch(updateAddProduct({
        topProductId: product.id,
        cartId: selectionData.cartId,
        productId: selectionData.productId,
        sideProducts: selectionData.sideProducts,
        choice: selectionData.choice,
        mainName: selectionData.mainName,
        partName: selectionData.partName,
        type: selectionData.type,
        totalCost: selectionData.totalCost,
      }))
    } if (!canOpen) {
      dispatch(updateAddProduct({
        topProductId: product.id,
        cartId: `${product.id}||`,
        productId: product.id,
        sideProducts: null,
        choice: null,
        type: product.type_,
        totalCost: product.price,
        mainName: product.name_json
      }))
    }
  }

  function reduceItemFromCart() {
    if ((!canOpen || (canOpen && isOpen)) && lastCartId) {
      dispatch(updateReduceProduct({ cartId: lastCartId }))
    }
  }

  return <WrapperButton onClick={(e) => {
    if (!canOpen || (canOpen && isOpen)) e.stopPropagation()
  }} hasImage={hasImage} isOpen={isOpen}>
    <ButtonContainer>
      {cartData?.quantity? <>
        <ButtonItem onClick={reduceItemFromCart}>-</ButtonItem>
        <Separator />
        <ButtonItem onClick={addItemToCart}>+</ButtonItem>
      </>: (
        <ButtonItem onClick={addItemToCart}>ADD{canOpen && " +"}</ButtonItem>
      )}
    </ButtonContainer>
  </WrapperButton>
}

export default AddButton