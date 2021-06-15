import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";

import "react-phone-input-2/lib/material.css"
import styled from "styled-components";
import LoginComponent from "../../components/templateOne/pages/login/login.pages.templateOne.components";
import { BREAKPOINTS } from "../../constants/grid-system-configuration";

const LoginContainer = styled.section`
  height: calc(100vh - ${props => props.theme.navMobile.height}px);
  display: flex;
  width: 100%;
  align-items: center;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100vh - ${props => props.theme.navDesktop.height}px);
  }
`

const WidthFix = styled.div`
  width: 100%;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-bottom: 120px;
  }
`

const LoginPageTemplateOne: FunctionComponent = ({}) => {
  return <LoginContainer>
    <WidthFix>
      <Container>
        <Row justify="center" >
          <Col xl={8}>
            <LoginComponent />
          </Col>
        </Row>
      </Container>
    </WidthFix>
  </LoginContainer>
}

export default LoginPageTemplateOne
