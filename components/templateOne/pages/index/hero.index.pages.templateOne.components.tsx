import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import Image from 'next/image';

import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectShop } from '../../../../redux/slices/index.slices.redux';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { selectLanguage } from '../../../../redux/slices/configuration.slices.redux';
import { useTranslation } from 'react-i18next';

const WrapperSection = styled.section`
  height: calc(100vh - ${(props) => props.theme.navMobile.height}px);
  position: relative;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100vh - ${(props) => props.theme.navDesktop.height}px);
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const ContentContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.4962359943977591) 0%, rgba(255, 255, 255, 0) 100%);
  color: #fff;
  display: flex;
  flex: 1 1 auto;
  div {
    width: 100%;
    align-self: center;
  }
`;

const Title = styled.h1`
  font-size: 64px;
  margin: 0;
`;

const SubTitle = styled.h2``;

const OrderButton = styled.a`
  background-color: ${(props) => props.theme.primaryColor};
  font-weight: 700;
  font-size: 24px;
  color: #222;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: ${(props) => props.theme.border};
  padding: 12px 24px;
  margin: 12px 0;
  display: inline-block;
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  transition: all 300ms ease-in-out;
  box-shadow: 0 0 0 0 rgba(${(props) => `${props.theme.primaryColorRed},${props.theme.primaryColorGreen},${props.theme.primaryColorBlue}, 0.7`});
`;

const IndexPageHero: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const shopData = useAppSelector(selectShop);
  const { t } = useTranslation('page-index');

  return (
    <WrapperSection>
      <ImageContainer>{shopData?.cover && <Image src={shopData?.cover} layout="fill" loading="eager" objectFit="cover" />}</ImageContainer>
      <ContentContainer>
        <Container>
          <Row>
            <Col>
              <Title>{shopData?.name}</Title>
              <SubTitle>{shopData?.category_json[language]}</SubTitle>
              <OrderButton href="/menu">{t('@order-online')}</OrderButton>
            </Col>
          </Row>
        </Container>
      </ContentContainer>
    </WrapperSection>
  );
};

export default IndexPageHero;
