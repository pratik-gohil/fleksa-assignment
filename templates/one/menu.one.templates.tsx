import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import Cart from "../../components/templateOne/common/cart/cart.common.templateOne.components";
import MenuPageBanner from "../../components/templateOne/pages/menu/banner.menu.pages.templateOne.components";
import MenuPageCategoryList from "../../components/templateOne/pages/menu/category-list.menu.pages.templateOne.components";
import MenuPageCategorySidebar from "../../components/templateOne/pages/menu/category-sidebar.menu.pages.templateOne.components";
import OrderTypeManager from "../../components/templateOne/common/orderType/order-type-manager.menu.pages.templateOne.components";
import { BREAKPOINTS } from "../../constants/grid-system-configuration";
import { useAppSelector } from "../../redux/hooks.redux";
import { selectOrderType } from "../../redux/slices/checkout.slices.redux";
import { selectShowOrderTypeSelect } from "../../redux/slices/menu.slices.redux";

const SideViewLeft = styled.div`
  position: sticky;
  top: ${props => props.theme.navDesktop.height}px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-top: ${props => props.theme.dimen.X4*5}px;
  }
`

const SideViewRight = styled(SideViewLeft)`
  display: none;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`

const MenuPageTemplateOne: FunctionComponent = ({}) => {
  const orderType = useAppSelector(selectOrderType)
  const showSelectOrderType = useAppSelector(selectShowOrderTypeSelect)

  return <>
    <MenuPageBanner />
    <Container>
      <Row>
        <Col sm={12} md={12} lg={3} xxl={3}>
          <SideViewLeft>
            <MenuPageCategorySidebar />
          </SideViewLeft>
        </Col>
        <Col sm={12} md={12} lg={5} xxl={6}>
          <MenuPageCategoryList />
        </Col>
        <Col sm={12} md={12} lg={4} xxl={3}>
          <SideViewRight>
            <Cart />
          </SideViewRight>
        </Col>
      </Row>
    </Container>
    {(showSelectOrderType || orderType === null) && <OrderTypeManager key="key-ajkndalkwdmalkwmdlkw" />}
  </>
}

export default MenuPageTemplateOne
