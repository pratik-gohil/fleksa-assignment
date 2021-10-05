import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import AppButtons from '../../common/appButtons/app-buttons.common.templateOne.components';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguage, selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import { selectAddress, selectShop, selectTimings } from '../../../../redux/slices/index.slices.redux';
import { isShopOpened } from '../../../../utils/restaurant-timings.utils';
import { IShopAvailablity } from '../../../../interfaces/common/index.common.interfaces';
import CustomLink from '../../common/amplitude/customLink';
import moment from 'moment';

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
    height: 100vh;
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

const Title = styled.p`
  font-size: clamp(2.53rem, 5rem, 28px);
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
  height: 100%;

  @media (max-width: ${BREAKPOINTS.lg}px) {
    align-items: center;
  }
`;

interface IPropsImage {
  image: string;
}

const Image = styled.div<IPropsImage>`
  background-image: ${(props) => `url(${props.image})`};
  width: 280px;
  height: 560px;
  border: 8px solid #222;
  border-radius: 20px;
  box-shadow: 0 0 2px 2px #222;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    position: absolute;
  }
`;

const ShopTitle = styled.p`
  font-size: 24px;
  margin: 0;
  padding: 0;
  width: 80%;
  color: #fff;
  font-weight: 600;
  font-size: 24px; ;
`;

const ShopSubTitle = styled.p`
  padding: 0;
  margin: 0;
  color: #fff;
`;

const LogoLink = styled.a`
  height: 120px;
  width: 120px;
  @media (max-width: ${BREAKPOINTS.lg}px) {
    height: 100px;
    width: 100px;
  }
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
  max-width: 280px;
  padding: 40px 20px;
`;

const IsClosed = styled.p`
  color: #fff;
  font-size: 16px;
  padding-top: 1rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding-top: 0;
  }
`;

export const INITIAL_TIMING_STATE = {
  availability: false,
  isClosed: false,
  next: {
    day: '',
    time: '',
  },
};

const OrderButton = styled.a`
  background-color: ${(props) => props.theme.primaryColor};
  font-weight: 700;
  color: #222;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: ${(props) => props.theme.border};
  padding: 6px 12px;
  margin: 24px 0 0 0;
  display: inline-block;
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  transition: all 300ms ease-in-out;
  box-shadow: 0 0 0 0
    rgba(${(props) => `${props.theme.primaryColorRed},${props.theme.primaryColorGreen},${props.theme.primaryColorBlue}, 0.7`});

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 18px 0;
    padding: 12px 24px;
    font-size: 18px;
  }
`;

const AppSection: FunctionComponent = () => {
  const { t } = useTranslation('page-index');
  const shopData = useAppSelector(selectShop);
  const language = useAppSelector(selectLanguage);
  const addressData = useAppSelector(selectAddress);
  const timingsData = useAppSelector(selectTimings);
  const selectedMenuId = useAppSelector(selectSelectedMenu);

  const [shop, setShop] = useState<IShopAvailablity>(INITIAL_TIMING_STATE);

  useEffect(() => {
    if (!addressData?.has_delivery && !addressData?.has_pickup && !addressData?.has_dinein && !addressData?.has_reservations)
      return setShop({
        availability: false,
        isClosed: true,
      });

    setShop(isShopOpened(timingsData, moment(), { has_pickup: addressData.has_pickup, has_delivery: addressData.has_delivery }));
  }, []);

  return (
    <WrapperContainer>
      <ImageSection>
        {!!shopData?.cover_json.images[0] && <Image image={shopData?.cover_json.images[0]} />}
        <ShopInfo>
          <LogoLink onClick={() => alert('clicked')} href="#">
            {!!shopData?.logo && <Logo src={shopData?.logo} loading="lazy" />}
          </LogoLink>

          <ShopTitle>{shopData?.name}</ShopTitle>
          <ShopSubTitle>{shopData?.category_json[language]}</ShopSubTitle>
          {shop.availability ? (
            <CustomLink
              href={selectedMenuId ? `/menu/${selectedMenuId}` : `/menu`}
              amplitude={{
                text: t('@order-online'),
                type: 'button',
              }}
              placeholder={t('@order-online')}
              Override={OrderButton}
            />
          ) : !shop.isClosed ? (
            <>
              <CustomLink
                href={selectedMenuId ? `/menu/${selectedMenuId}` : `/menu`}
                amplitude={{
                  text: t('@pre-online'),
                  type: 'button',
                }}
                placeholder={t('@pre-online')}
                Override={OrderButton}
              />

              <IsClosed>
                {t('@next-hours-1')} {t('@next-hours')} {shop.next?.dayNumber ? ` ${shop.next?.dayNumber} ,` : ''}{' '}
                {t(`@${shop.next?.day.toUpperCase()}`)}, {shop.next?.time}
              </IsClosed>
            </>
          ) : (
            <>
              <CustomLink
                href={selectedMenuId ? `/menu/${selectedMenuId}` : '/menu'}
                amplitude={{
                  text: t('@discover'),
                  type: 'button',
                }}
                placeholder={t('@discover')}
                Override={OrderButton}
              />

              <IsClosed>{t('@closed')}</IsClosed>
            </>
          )}
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
