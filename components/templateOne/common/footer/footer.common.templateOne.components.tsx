import { FunctionComponent } from "react";
import { Container, Row, Col } from "react-grid-system";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";
import Address from "./address.footer.common.templateOne.components";
import LegalLinks from "./legal.footer.common.templateOne.components";
import PoweredBy from "./powered-by.footer.common.templateOne.components";

const WrapperFooter = styled.footer`
  display: none;
  background: ${props => props.theme.footer.background};
  padding: ${props => props.theme.dimen.X4}px 0;
  p {
    color: ${props => props.theme.textLightColor};
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`

const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`

const Footer: FunctionComponent = ({ }) => {
  return <WrapperFooter>
    <Container>
      <Row>
        <Col>
          <ContentContainer>
            <Address />
          </ContentContainer>
        </Col>
        <Col>
          <ContentContainer>
            <PoweredBy />
          </ContentContainer>
        </Col>
        <Col>
          <ContentContainer>
            <LegalLinks />
          </ContentContainer>
        </Col>
      </Row>
    </Container>
  </WrapperFooter>
}

export default Footer