import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import Image from 'next/image';

import { isShopOpened } from '../../../../utils/restaurant-timings.utils';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectAddress, selectShop, selectTimings } from '../../../../redux/slices/index.slices.redux';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { selectLanguage, selectLanguageCode, selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

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
  padding: 0 0 0 1rem;

  div {
    align-self: center;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    left: 0;
    div {
      width: 100%;
    }
  }
`;

const Title = styled.h1`
  font-size: clamp(2.53rem, 5rem, 8vw);
  margin: 0;
  padding: 0;
  width: 80%;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  @media (max-width: ${BREAKPOINTS.sm}px) {
    font-weight: 600;
    line-height: 1.2;
    width: 100%;
  }
`;

const SubTitle = styled.h2`
  padding: 0;
  margin: 0;
  font-size: clamp(1rem, 1.8rem, 3vw);
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding-top: 0.5rem;
    font-weight: 400;
  }
`;

const OrderButton = styled.a`
  background-color: ${(props) => props.theme.primaryColor};
  font-weight: 700;
  font-size: 24px;
  color: #222;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: ${(props) => props.theme.border};
  padding: 12px 24px;
  margin: 24px 0 0 0;
  display: inline-block;
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  transition: all 300ms ease-in-out;
  box-shadow: 0 0 0 0 rgba(${(props) => `${props.theme.primaryColorRed},${props.theme.primaryColorGreen},${props.theme.primaryColorBlue}, 0.7`});

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 18px 0;
    padding: 12px 24px;
    font-size: 18px;
  }
`;

const LogoLink = styled.a`
  display: none;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  background-color: white;
  overflow: hidden;
  margin-bottom: 1em;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: grid;
    place-items: center;
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const SubTitle2 = styled(SubTitle)`
  font-size: clamp(0.8rem, 1.2rem, 3vw);
  padding-top: 1rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding-top: 0;
  }
`;

const Carousel = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition-duration: 500ms;
`;

const CarouselSlide = styled.div<{ translateX: number }>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  float: left;
  transition-duration: 500ms;
  transform: translateX(${(props) => props.translateX}%);
`;

const slideChangeDealy = 5000;

const INITIAL_TIMING_STATE = {
  availability: false,
  isClosed: false,
  next: {
    day: '',
    time: '',
  },
};

const IndexPageHero: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const shopData = useAppSelector(selectShop);
  const timingsData = useAppSelector(selectTimings);
  const languageCode = useAppSelector(selectLanguageCode);
  const selectedMenuId = useAppSelector(selectSelectedMenu);
  const addressData = useAppSelector(selectAddress);
  const { t } = useTranslation('page-index');

  const [carouselImages, setCarouselImages] = useState<Array<string>>(shopData?.cover_json?.images || []);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (shopData?.cover_json?.images && shopData?.cover_json?.images.length > 1) {
      if (activeSlide > carouselImages.length - 2) {
        const temp = carouselImages.concat(shopData?.cover_json?.images);
        setCarouselImages(temp);
      }
      let timer1 = setTimeout(() => {
        setActiveSlide(activeSlide + 1);
      }, slideChangeDealy);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [activeSlide]);

  const [shop, setShop] = useState<{
    availability: boolean;
    isClosed: boolean;
    next?: {
      day: string;
      time: string;
      dayNumber?: string;
    };
  }>(INITIAL_TIMING_STATE);

  useEffect(() => {
    if (!addressData?.has_delivery && !addressData?.has_pickup && !addressData?.has_dinein && !addressData?.has_reservations)
      return setShop({
        availability: false,
        isClosed: true,
      });

    setShop(isShopOpened(timingsData, moment()));
  }, []);

  return (
    <WrapperSection>
      <ImageContainer>
        <Carousel>
          {carouselImages?.map((image, index) => {
            let translateX;
            if (index === activeSlide) translateX = 0;
            else if (index > activeSlide) translateX = 100;
            else translateX = -100;

            return (
              <CarouselSlide translateX={translateX} key={index}>
                <Image src={image} layout="fill" loading={index === 0 ? 'eager' : 'lazy'} objectFit="cover" />
              </CarouselSlide>
            );
          })}
        </Carousel>
      </ImageContainer>

      <ContentContainer>
        <Wrapper>
          <Container>
            <Row>
              <Col>
                <LogoLink href={`/${languageCode}/`}>{!!shopData?.logo && <Logo src={shopData?.logo} loading="lazy" />}</LogoLink>

                <Title>{shopData?.name}</Title>
                <SubTitle>{shopData?.category_json[language]}</SubTitle>

                {shop.availability ? (
                  <OrderButton href={selectedMenuId ? `/${languageCode}/menu/${selectedMenuId}` : '/menu'}>{t('@order-online')}</OrderButton>
                ) : !shop.isClosed ? (
                  <>
                    <OrderButton href={selectedMenuId ? `/${languageCode}/menu/${selectedMenuId}` : '/menu'}>{t('@pre-online')}</OrderButton>
                    <SubTitle2>
                      {t('@next-hours')} {shop.next?.dayNumber ? ` ${shop.next?.dayNumber} ,` : ''} {t(`@${shop.next?.day.toUpperCase()}`)},{' '}
                      {shop.next?.time}
                    </SubTitle2>
                  </>
                ) : (
                  <>
                    <OrderButton href={selectedMenuId ? `/${languageCode}/menu/${selectedMenuId}` : '/menu'}>{t('@discover')}</OrderButton>
                    <SubTitle2>{t('@closed')}</SubTitle2>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </Wrapper>
      </ContentContainer>
    </WrapperSection>
  );
};

export default IndexPageHero;
