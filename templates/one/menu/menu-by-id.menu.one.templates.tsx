import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import Cart from "../../../components/templateOne/common/cart/cart.common.templateOne.components";
import MenuPageBanner from "../../../components/templateOne/pages/menu/banner.menu.pages.templateOne.components";
import MenuPageCategoryList from "../../../components/templateOne/pages/menu/category-list.menu.pages.templateOne.components";
import MenuPageCategorySidebar from "../../../components/templateOne/pages/menu/category-sidebar.menu.pages.templateOne.components";
import OrderTypeManager from "../../../components/templateOne/common/orderType/order-type-manager.menu.pages.templateOne.components";
import { BREAKPOINTS } from "../../../constants/grid-system-configuration";
import { useAppSelector } from "../../../redux/hooks.redux";
import { selectOrderType, selectSelectedAddressId } from "../../../redux/slices/checkout.slices.redux";
import { selectShowAddress, selectShowOrderTypeSelect } from "../../../redux/slices/menu.slices.redux";
import AddressAdd from "../../../components/templateOne/common/addresses/address-add.common.templateOne.components";
import MenuPageCartSummary from "../../../components/templateOne/pages/menu/cart-summary.pages.templateOne.components";
import { LS_GUEST_USER_ADDRESS } from "../../../constants/keys-local-storage.constants";
import { useTranslation } from "next-i18next";

const SideViewLeft = styled.div`
  display: none;
  position: sticky;
  top: ${props => props.theme.navDesktop.height}px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
    margin-top: ${props => props.theme.dimen.X4*5}px;
  }
`

const SideViewLeftMobile = styled.div`
  position: sticky;
  top: -20px;
  background: #fff;
  z-index: 1;
  height: 70px;
  border-bottom: ${props => props.theme.border};
  overflow: hidden;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`

const SideViewRight = styled(SideViewLeft)`
  display: none;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`

const DisclaimerContainer = styled.div`
  background: #f9f9f9;
  padding: ${props => props.theme.dimen.X4}px;
  border-radius: ${props => props.theme.borderRadius}px;
  margin: ${props => props.theme.dimen.X4*2}px 0;
`

const Disclaimer = styled.p`
  font-size: 12px
`

const MenuByIdPageTemplateOne: FunctionComponent = ({}) => {
  const { t } = useTranslation("disclaimer")
  const orderType = useAppSelector(selectOrderType)
  const showAddAddress = useAppSelector(selectShowAddress)
  const checkoutAddressId = useAppSelector(selectSelectedAddressId)
  const showSelectOrderType = useAppSelector(selectShowOrderTypeSelect)

  return <>
    <MenuPageBanner />
    <SideViewLeftMobile>
      <MenuPageCategorySidebar />
    </SideViewLeftMobile>
    <Container>
      <Row>
        <Col sm={12} md={12} lg={3} xxl={3}>
          <SideViewLeft>
            <MenuPageCategorySidebar />
          </SideViewLeft>
        </Col>
        <Col sm={12} md={12} lg={5} xxl={5}>
          <MenuPageCategoryList />
          <DisclaimerContainer>
            <Disclaimer>{t("line-1")}</Disclaimer>
            <Disclaimer>{t("line-2")}</Disclaimer>
          </DisclaimerContainer>
        </Col>
        <Col sm={12} md={12} lg={4} xxl={4}>
          <SideViewRight>
            <Cart />
          </SideViewRight>
        </Col>
      </Row>
    </Container>
    <MenuPageCartSummary />
    {((showSelectOrderType || orderType === null) && !showAddAddress)
      ? <OrderTypeManager key="key-ajkndalkwdmalkwmdlkw" />
      : (showAddAddress
        || (orderType === "DELIVERY" && checkoutAddressId === null
        && orderType === "DELIVERY" && !window.localStorage.getItem(LS_GUEST_USER_ADDRESS))) && <AddressAdd />}
  </>
}

export default MenuByIdPageTemplateOne
