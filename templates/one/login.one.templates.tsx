import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';

import styled from 'styled-components';
import LoginComponent from '../../components/templateOne/pages/login/login.pages.templateOne.components';
import { Snackbar } from '../../components/templateOne/common/snackbar/snackbar.error.pages.templateOne.components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';

const LoginContainer = styled.section`
  height: calc(100vh - ${(props) => props.theme.navMobile.height}px);
  display: flex;
  width: 100%;
  align-items: center;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100vh - ${(props) => props.theme.navDesktop.height}px);
  }
`;

const WidthFix = styled.div`
  width: 100%;
  position: relative;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-bottom: 120px;
  }
`;

const WaveImg = styled.svg`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  display: none;

  @media (min-width: ${BREAKPOINTS.md}px) {
    display: block;
  }
`;

const Path = styled.path`
  fill: ${(p) => p.theme.primaryColor};
`;

const LoginPageTemplateOne: FunctionComponent = ({}) => {
  const router = useRouter();

  return (
    <LoginContainer>
      <WidthFix>
        <Container>
          <Row justify="center">
            <Col xl={8}>
              <LoginComponent onLogin={() => router.push('/account')} />
            </Col>
          </Row>
        </Container>

        <WaveImg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <Path
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,245.3C384,267,480,277,576,256C672,235,768,181,864,186.7C960,192,1056,256,1152,245.3C1248,235,1344,149,1392,106.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></Path>
        </WaveImg>
      </WidthFix>

      <Snackbar />
    </LoginContainer>
  );
};

export default LoginPageTemplateOne;
