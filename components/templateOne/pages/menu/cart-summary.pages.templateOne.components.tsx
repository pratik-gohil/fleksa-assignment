import { FunctionComponent } from "react"
import styled from "styled-components"
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux"
import { selectCart } from "../../../../redux/slices/cart.slices.redux"
import { selectLanguageCode, updateShowCart } from "../../../../redux/slices/configuration.slices.redux"
import formatCurrency from "../../../../utils/formatCurrency"

const WrapperCartSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${props => props.theme.primaryColor};
  border-top: ${props => props.theme.border};
  position: fixed;
  left: 0;
  right: 0;
  bottom: ${props => props.theme.navMobile.height}px;
  z-index: 1;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`

const Text = styled.p`
  padding: ${props => props.theme.dimen.X4}px;
  margin: 0;
`

const MenuPageCartSummary: FunctionComponent = ({}) => {
  const cartData = useAppSelector(selectCart)
  const languageCode = useAppSelector(selectLanguageCode)
  const dispatch = useAppDispatch()

  const itemsInCart = Object.keys(cartData.items).reduce((acc, i) => cartData.items[i].quantity + acc, 0)

  return <WrapperCartSummary>
    <Text><strong>{itemsInCart} Item | {formatCurrency(cartData.cartCost, languageCode)}</strong></Text>
    <Text onClick={() => dispatch(updateShowCart(true))}><strong>Proceed</strong></Text>
  </WrapperCartSummary>
}

export default MenuPageCartSummary