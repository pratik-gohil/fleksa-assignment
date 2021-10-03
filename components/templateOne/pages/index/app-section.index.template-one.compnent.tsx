import { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import AppButtons from '../../common/appButtons/app-buttons.common.templateOne.components';

const WrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${(props) => props.theme.dimen.X4 * 4}px 0;
  margin: ${(props) => props.theme.dimen.X4 * 4}px 0;

  & > div {
    flex: 1;
  }

  @media (min-width: ${BREAKPOINTS.lg}px) {
    background-image: url('/assets/svg/app-section-background.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }

  @media (max-width: ${BREAKPOINTS.lg}px) {
    flex-direction: column-reverse;

    & > div {
      padding: 0 1rem;
      margin: 1rem 0;
      width: 100%;
    }

    & > div:nth-child(1) {
      background-image: url('/assets/svg/app-section-background.svg');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 2rem 0;
    margin: 0;
  }
`;

const Title = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #ffd100;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    text-align: center;
    display: block;
  }
`;

const Summary = styled.p`
  line-height: 2rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    text-align: justify;
    display: block;
  }
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: ${BREAKPOINTS.lg}px) {
    align-items: center;
  }
`;

const Image = styled.img`
  height: 100%;

  @media (max-width: ${BREAKPOINTS.lg}px) {
    width: 70%;
    height: 50%;
  }
`;

const AppSection: FunctionComponent = () => {
  const { t } = useTranslation('page-index');

  return (
    <WrapperContainer>
      <ImageSection>
        <Image src="assets/png/mobile-frame.png" />
      </ImageSection>
      <Container>
        <Row>
          <Col xxl={7}>
            <div>
              <Title>{t('@app-section-title')}</Title>

              <Summary>{t('@app-section-summary')}</Summary>

              <AppButtons direction="row" />
            </div>
          </Col>
        </Row>
      </Container>
    </WrapperContainer>
  );
};

export default AppSection;
