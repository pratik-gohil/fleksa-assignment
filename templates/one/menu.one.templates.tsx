import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import MenuPageBanner from "../../components/templateOne/pages/menu/banner.menu.pages.templateOne.components";
import MenuPageCategoryList from "../../components/templateOne/pages/menu/category-list.menu.pages.templateOne.components";
import MenuPageCategorySidebar from "../../components/templateOne/pages/menu/category-sidebar.menu.pages.templateOne.components";

const SideContainer = styled(Col)`

`

const SideView = styled.div`
  position: sticky;
  top: 82px;
`

const MenuPageTemplateOne: FunctionComponent = ({}) => {
  return <>
    <MenuPageBanner />
    <Container>
      <Row>
        <SideContainer lg={3}>
          <SideView>
            <MenuPageCategorySidebar />
          </SideView>
        </SideContainer>
        <Col lg={6}>
          <MenuPageCategoryList />
        </Col>
        <SideContainer lg={3}>
          <SideView>
            <p>Your Cart</p>
          </SideView>
        </SideContainer>
      </Row>
    </Container>
  </>
}

export default MenuPageTemplateOne
