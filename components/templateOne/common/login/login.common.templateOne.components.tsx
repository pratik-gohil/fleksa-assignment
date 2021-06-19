import { useRouter } from "next/dist/client/router";
import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";

import "react-phone-input-2/lib/material.css"
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectShowLogin, updateShowLogin } from "../../../../redux/slices/configuration.slices.redux";
import LoginComponent from "../../pages/login/login.pages.templateOne.components";

const LoginContainer = styled.section<{ showLogin: boolean }>`
  display: ${props => props.showLogin? "flex": "none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  align-items: center;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`

const WidthFix = styled.div`
  width: 100%;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-bottom: 120px;
  }
`

const LoginAllPages: FunctionComponent = ({}) => {
  const router = useRouter()
  const showLogin = useAppSelector(selectShowLogin)
  const dispach = useAppDispatch()

  return <LoginContainer showLogin={showLogin} onClick={() => dispach(updateShowLogin(!showLogin))}>
    <WidthFix>
      <Container>
        <Row justify="center" >
          <Col xl={8} onClick={e => e.stopPropagation()}>
            <LoginComponent onLogin={() => router.push("/checkout")} />
          </Col>
        </Row>
      </Container>
    </WidthFix>
  </LoginContainer>
}

export default LoginAllPages
