import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import MenuPageCategoryList from "../../components/templateOne/pages/menu/category-list.menu.pages.templateOne.components";

const MenuPageTemplateOne: FunctionComponent = ({}) => {
  return <Container>
    <Row>
      <Col>
        <MenuPageCategoryList />
      </Col>
    </Row>
  </Container>
}

export default MenuPageTemplateOne
