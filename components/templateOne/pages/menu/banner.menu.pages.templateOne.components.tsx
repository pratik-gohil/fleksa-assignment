import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectShop } from "../../../../redux/slices/index.slices.redux";
import { Col, Container, Row } from "react-grid-system";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import SvgDelivery from "../../../../public/assets/svg/delivery.svg";
import SvgPickup from "../../../../public/assets/svg/pickup.svg";
import SvgDinein from "../../../../public/assets/svg/dinein.svg";
import { ICheckoutOrderTypes, selectOrderType } from "../../../../redux/slices/checkout.slices.redux";
import { updateShowOrderTypeSelect } from "../../../../redux/slices/menu.slices.redux";

const BannerContainer = styled.section`
  height: 400px;
  position: relative;
  border-bottom: ${props => props.theme.border};
`

const ContentTop = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
`

const ContentTopContent = styled.div`
  width: 100%;
  height: auto;
`

const Title = styled.h1`
  font-size: 36px;
  margin: 0;
`

const SubTitle = styled.h2`
  font-size: 24px;
`

const OrderTypeContainer = styled.div`
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.4);
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: ${props => props.theme.dimen.X4}px ${props => props.theme.dimen.X4*2}px;
  svg {
    width: 36px;
    height: 36px;
    fill: #fff;
    display: block;
  }
  p {
    color: #fff;
    margin: 0 0 0 ${props => props.theme.dimen.X4}px;
    padding: 0;
    font-weight: 700;
  }
`

const OrderTypeView = styled.div`
  height: 64px;
`

const OrderType: Record<ICheckoutOrderTypes, {
  title: string
  logo: any
}> = {
  "DELIVERY": {
    title: "Delivery",
    logo: SvgDelivery
  },
  "PICKUP": {
    title: "Takeaway",
    logo: SvgPickup
  },
  "DINE_IN": {
    title: "Dine-in",
    logo: SvgDinein
  },
  // placeholder item. order type will not be reservation
  "RESERVATION": {
    title: "",
    logo: SvgDinein
  }
}

const MenuPageBanner: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const shopData = useAppSelector(selectShop)
  const selectedOrderType = useAppSelector(selectOrderType)
  const dispach = useAppDispatch()

  const orderTypeData = selectedOrderType && OrderType[selectedOrderType]

  function onClickOrderType() {
    dispach(updateShowOrderTypeSelect(true))
  }

  return <BannerContainer>
    {shopData?.cover && <Image src={shopData.cover} loading="eager" layout="fill" objectFit="cover" />}
    <ContentTop>
      <ContentTopContent>
        <Container>
          <Row>
            <Col>
              <Title>{shopData?.name}</Title>
              <SubTitle>{shopData?.category_json[language]}</SubTitle>
              <OrderTypeView>
                {(selectedOrderType && orderTypeData) && <OrderTypeContainer onClick={onClickOrderType}>
                  <orderTypeData.logo />
                  <p>{orderTypeData.title}</p>
                </OrderTypeContainer>}
              </OrderTypeView>
            </Col>
          </Row>
        </Container>
      </ContentTopContent>
    </ContentTop>
  </BannerContainer>
}

export default MenuPageBanner