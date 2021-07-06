import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import { MyAccountLeftSection } from './my-account.left-navigator.pages.templateOne.components';
import { MyAccountRightSection } from './my-account.left-navigator.pages.templateOne.components copy';

const WrapperSection = styled.section`
  border-bottom: ${(props) => props.theme.border};
`;

const AccountPageMyAccount: FunctionComponent = ({}) => {
  return (
    <WrapperSection>
      <Container>
        <Row justify="center">
          <Col lg={4}>
            <MyAccountLeftSection />
          </Col>

          <Col sm={12} lg={8}>
            <MyAccountRightSection />
          </Col>
        </Row>
      </Container>
    </WrapperSection>
  );
};

export default AccountPageMyAccount;
