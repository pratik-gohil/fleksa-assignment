import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import Cart from "../../components/templateOne/common/cart/cart.common.templateOne.components";
import MenuPageBanner from "../../components/templateOne/pages/menu/banner.menu.pages.templateOne.components";
import MenuPageCategoryList from "../../components/templateOne/pages/menu/category-list.menu.pages.templateOne.components";
import MenuPageCategorySidebar from "../../components/templateOne/pages/menu/category-sidebar.menu.pages.templateOne.components";
import { BREAKPOINTS } from "../../constants/grid-system-configuration";

const SideView = styled.div`
  position: sticky;
  top: ${props => props.theme.navDesktop.height}px;
  display: none;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`

const MenuPageTemplateOne: FunctionComponent = ({}) => {
  return <>
    <MenuPageBanner />
    <Container>
      <Row>
        <Col sm={12} md={12} lg={3} xxl={3}>
          <SideView>
            <MenuPageCategorySidebar />
          </SideView>
        </Col>
        <Col sm={12} md={12} lg={5} xxl={6}>
          <MenuPageCategoryList />
        </Col>
        <Col sm={12} md={12} lg={4} xxl={3}>
          <SideView>
            <Cart />
          </SideView>
        </Col>
      </Row>
    </Container>
  </>
}

export default MenuPageTemplateOne
