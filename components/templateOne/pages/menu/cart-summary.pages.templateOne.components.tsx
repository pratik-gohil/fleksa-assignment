import { FunctionComponent } from "react"
import styled from "styled-components"
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux"
import { selectCart } from "../../../../redux/slices/cart.slices.redux"
import { updateShowCart } from "../../../../redux/slices/configuration.slices.redux"

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
  const dispatch = useAppDispatch()
  
  return <WrapperCartSummary>
    <Text>Total: <strong>€{cartData.cartCost}</strong></Text>
    <Text onClick={() => dispatch(updateShowCart(true))}><strong>View Cart</strong></Text>
  </WrapperCartSummary>
}

export default MenuPageCartSummary