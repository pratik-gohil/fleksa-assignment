import { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import AppButtons from '../../common/appButtons/app-buttons.common.templateOne.components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectShop } from '../../../../redux/slices/index.slices.redux';
import { selectLanguage } from '../../../../redux/slices/configuration.slices.redux';

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
  position: relative;
  display: flex;
  justify-content: center;

  @media (max-width: ${BREAKPOINTS.lg}px) {
    align-items: center;
  }
`;

const Image = styled.img`
  position: relative;
  height: 100%;

  @media (max-width: ${BREAKPOINTS.lg}px) {
    width: 70%;
    height: 50%;
  }
`;

const ShopTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  padding: 0;
  width: 80%;
  color: #fff;
  @media (max-width: ${BREAKPOINTS.lg}px) {
    font-size: 32px;
  }
  @media (max-width: ${BREAKPOINTS.md}px) {
    font-size: 28px;
  }
  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-weight: 600;
    font-size: 24px;
  }
  @media (max-width: ${BREAKPOINTS.xs}px) {
    font-size: 14px;
  }
`;

const ShopSubTitle = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 20px;
  color: #fff;
  @media (max-width: ${BREAKPOINTS.lg}px) {
    font-size: 28px;
  }
  @media (max-width: ${BREAKPOINTS.md}px) {
    font-size: 18px;
  }
  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding-top: 0.5rem;
    font-weight: 400;
    font-size: 20px;
  }
  @media (max-width: ${BREAKPOINTS.xs}px) {
    font-size: 12px;
  }
`;

const LogoLink = styled.a`
  height: 120px;
  width: 120px;
  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: 60px;
    width: 60px;
  }
  border-radius: 50%;
  background-color: white;
  overflow: hidden;
  margin-bottom: 1em;
  display: grid;
  place-items: center;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const ShopInfo = styled.div`
  position: absolute;
  top: 20%;
  left: 30%;
  max-width: 50%;
  @media (min-width: ${BREAKPOINTS.xxl}px) {
    left: 35%;
  }
  @media (max-width: ${BREAKPOINTS.xxl}px) {
    left: 30%;
  }
  @media (max-width: ${BREAKPOINTS.lg}px) {
    left: 25%;
  }
  @media (max-width: ${BREAKPOINTS.md}px) {
    left: 25%;
    top: 20%;
  }
  @media (max-width: ${BREAKPOINTS.sm}px) {
    left: 25%;
    top: 20%;
  }
  @media (max-width: ${BREAKPOINTS.xs}px) {
    left: 25%;
    top: 15%;
  }
`;

const AppSection: FunctionComponent = () => {
  const { t } = useTranslation('page-index');
  const shopData = useAppSelector(selectShop);
  const language = useAppSelector(selectLanguage);

  return (
    <WrapperContainer>
      <ImageSection>
        <Image src="assets/png/mobile-frame.png" />

        <ShopInfo>
          <LogoLink onClick={() => alert('clicked')} href="#">
            {!!shopData?.logo && <Logo src={shopData?.logo} loading="lazy" />}
          </LogoLink>

          <ShopTitle>{shopData?.name}</ShopTitle>
          <ShopSubTitle>{shopData?.category_json[language]}</ShopSubTitle>
        </ShopInfo>
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
