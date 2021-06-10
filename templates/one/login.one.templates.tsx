import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useTranslation } from "react-i18next";


const LoginPageTemplateOne: FunctionComponent = ({}) => {
  const { t } = useTranslation("page-terms")

  return <Container>
    <Row>
      <Col>
      </Col>
    </Row>
  </Container>
}

export default LoginPageTemplateOne
