import { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectCartItemByCartId, updateAddProduct, updateReduceProduct } from "../../../../redux/slices/cart.slices.redux";
import { selectItemSelectionByTopProductId } from "../../../../redux/slices/item-selection.slices.redux";

export interface IPropsAddButton {
  hasImage: boolean
  isOpen: boolean
  canOpen: boolean
  topProductId: number
}

interface IPropsWrapperButton {
  hasImage: boolean
  isOpen: boolean
}

const WrapperButton = styled.div<IPropsWrapperButton>`
  display: flex;
  z-index: 1;
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
  background-color: ${props => props.theme.primaryColor};
  border-radius: ${props => props.theme.borderRadius}px;
  border: ${props => props.theme.border};
  align-self: center;
  font-weight: 700;
  transition-duration: 500ms;
  overflow: hidden;
`

const ButtonItem = styled.p`
  display: flex;
  flex: 1;
  padding: 4px 12px;
  margin: 0;
  text-align: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const QuantityCount = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0 4px;
`

const AddButton: FunctionComponent<IPropsAddButton> = ({ topProductId, canOpen, hasImage, isOpen }) => {

  const selectionData = useAppSelector(state => selectItemSelectionByTopProductId(state, topProductId))
  const cartData = useAppSelector(state => selectCartItemByCartId(state, selectionData? selectionData.cartId: null))  
  const dispach = useAppDispatch()


  // console.log("cartData", JSON.stringify(selectionData, null, 2))

  function addItemToCart() {
    if ((!canOpen || (canOpen && isOpen)) && selectionData) {
      console.log(JSON.stringify(selectionData, null, 2))
      dispach(updateAddProduct({
        cartId: selectionData.cartId,
        productId: selectionData.productId,
        sideProducts: selectionData.sideProducts,
        choice: selectionData.choice,
        mainName: selectionData.mainName,
        partName: selectionData.partName
      }))
    }
  }

  function reduceItemFromCart() {
    if ((!canOpen || (canOpen && isOpen)) && selectionData) {
      dispach(updateReduceProduct({ cartId: selectionData.cartId }))
    }
  }

  return <WrapperButton onClick={(e) => {
    if (!canOpen || (canOpen && isOpen)) e.stopPropagation()
  }} hasImage={hasImage} isOpen={isOpen}>
    <ButtonContainer>
      {cartData?.quantity? <>
        <ButtonItem onClick={reduceItemFromCart}>-</ButtonItem>
        <QuantityCount>{cartData.quantity}</QuantityCount>
        <ButtonItem onClick={addItemToCart}>+</ButtonItem>
      </>: (
        <ButtonItem onClick={addItemToCart}>ADD +</ButtonItem>
      )}
    </ButtonContainer>
  </WrapperButton>
}

export default AddButton