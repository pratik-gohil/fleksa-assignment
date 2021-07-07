import { FunctionComponent } from "react"
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import SvgDelivery from "../../../../public/assets/svg/delivery.svg";
import SvgPickup from "../../../../public/assets/svg/pickup.svg";
import SvgDinein from "../../../../public/assets/svg/dinein.svg";
import { ICheckoutOrderTypes, selectOrderType } from "../../../../redux/slices/checkout.slices.redux";
import { updateShowOrderTypeSelect } from "../../../../redux/slices/menu.slices.redux";
import { selectSiblings } from "../../../../redux/slices/index.slices.redux";

const Wrapper = styled.div`
  margin-top: -60px;
`

const WrapperContent = styled.div`
  height: 120px;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
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
`

const OrderTypeContainer = styled.div`
  height: inherit;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 0 ${props => props.theme.dimen.X4}px;
  margin: 0 ${props => props.theme.dimen.X4}px;
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
  const dispatch = useAppDispatch()
  const orderTypeData = selectedOrderType && OrderType[selectedOrderType]

  function onClickOrderType() {
    dispatch(updateShowOrderTypeSelect(true))
  }

  return <Wrapper>
    <Container>
      <Row>
        <Col>
          <WrapperContent>
            <Left>
              <OrderTypeView>
                {(selectedOrderType && orderTypeData) && <OrderTypeContainer onClick={onClickOrderType}>
                  <orderTypeData.logo />
                  <p>{orderTypeData.title}</p>
                </OrderTypeContainer>}
              </OrderTypeView>
            </Left>
            <Right>
              {siblingsData.length > 0 && <ChangeRestaurantButton href="/menu">Change Store</ChangeRestaurantButton>}
            </Right>
          </WrapperContent>
        </Col>
      </Row>
    </Container>
  </Wrapper>
}

export default MenuFeatures