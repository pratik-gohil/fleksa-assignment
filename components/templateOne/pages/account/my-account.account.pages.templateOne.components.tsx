import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectCustomer } from "../../../../redux/slices/user.slices.redux";


const WrapperSection = styled.section`
  border-bottom: ${props => props.theme.border};
`


const AccountPageMyAccount: FunctionComponent = ({}) => {
  const customerData = useAppSelector(selectCustomer)

  return <WrapperSection>
    <Container>
      <Row justify="center">
        <Col sm={12} lg={6}>
          <h2>My Account</h2>
          <ul>
            <li>
              <h3>Name</h3>
              <p>{customerData.name}</p>
            </li>
            <li>
              <h3>Email</h3>
              <p>{customerData.email || "N/A"}</p>
            </li>
            <li>
              <h3>Phone Number</h3>
              <p>+{customerData.country_code} {customerData.phone}</p>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  </WrapperSection>

}

export default AccountPageMyAccount