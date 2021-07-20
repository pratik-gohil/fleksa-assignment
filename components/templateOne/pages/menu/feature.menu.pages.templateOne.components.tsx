import { FunctionComponent } from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import SvgDelivery from "../../../../public/assets/svg/delivery.svg";
import SvgPickup from "../../../../public/assets/svg/pickup.svg";
import SvgDinein from "../../../../public/assets/svg/dinein.svg";
import { ICheckoutOrderTypes, selectOrderType } from "../../../../redux/slices/checkout.slices.redux";
import { updateShowOrderTypeSelect } from "../../../../redux/slices/menu.slices.redux";
import { selectSiblings } from "../../../../redux/slices/index.slices.redux";
import { selectLanguageCode } from "../../../../redux/slices/configuration.slices.redux";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin-top: ${props => props.theme.dimen.X4*3}px;
`

const ChangeRestaurantButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-weight: 700;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: 0 ${props => props.theme.dimen.X4}px;
  margin: 0 ${props => props.theme.dimen.X4}px;
  background: #f9f9f9;
  color: #222;
`

const OrderTypeContainer = styled.div`
  height: inherit;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 0 ${props => props.theme.dimen.X4}px;
  background: #f9f9f9;
  svg {
    width: auto;
    height: 24px;
    display: block;
  }
  p {
    margin: 0 0 0 ${props => props.theme.dimen.X4}px;
    padding: 0;
    font-weight: 700;
  }
`

const OrderTypeView = styled.div`
  height: 50px;
`


const OrderType: Record<ICheckoutOrderTypes, {
  title: string
  logo: any
}> = {
  "DELIVERY": {
    title: "DELIVERY",
    logo: SvgDelivery
  },
  "PICKUP": {
    title: "TAKEAWAY",
    logo: SvgPickup
  },
  "DINE_IN": {
    title: "DINE-IN",
    logo: SvgDinein
  },
  // placeholder item. order type will not be reservation
  "RESERVATION": {
    title: "",
    logo: SvgDinein
  }
}

const MenuFeatures: FunctionComponent = () => {
  const selectedOrderType = useAppSelector(selectOrderType)
  const siblingsData = useAppSelector(selectSiblings)
  const languageCode = useAppSelector(selectLanguageCode)
  const dispatch = useAppDispatch()
  const orderTypeData = selectedOrderType && OrderType[selectedOrderType]

  function onClickOrderType() {
    dispatch(updateShowOrderTypeSelect(true))
  }

  return <Wrapper>
    <OrderTypeView>
      {(selectedOrderType && orderTypeData) && <OrderTypeContainer onClick={onClickOrderType}>
        <orderTypeData.logo />
        <p>{orderTypeData.title}</p>
      </OrderTypeContainer>}
    </OrderTypeView>
    {siblingsData.length > 0 && <ChangeRestaurantButton href={`/${languageCode}/menu`}>CHANGE STORE</ChangeRestaurantButton>}
  </Wrapper>
}

export default MenuFeatures