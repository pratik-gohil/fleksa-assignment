import React, { FunctionComponent, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import PhoneInput from "react-phone-input-2"

import "react-phone-input-2/lib/material.css"
import styled from "styled-components";

const LoginContainer = styled.section`
  height: 100%;
`

const LoginPageTemplateOne: FunctionComponent = ({}) => {
  // const { t } = useTranslation("page-terms")
  const [ phone, setPhone ] = useState("")

  return <Container>
    <Row>
      <Col>
        <LoginContainer>
          <PhoneInput
            country={'de'}
            value={phone}
            onChange={ph => setPhone(ph)}
          />
        </LoginContainer>
      </Col>
    </Row>
  </Container>
}

export default LoginPageTemplateOne
