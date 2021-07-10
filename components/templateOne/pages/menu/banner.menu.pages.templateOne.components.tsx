import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectOffers, selectShop } from "../../../../redux/slices/index.slices.redux";
import { Col, Container, Row } from "react-grid-system";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import MenuFeatures from "./feature.menu.pages.templateOne.components";

import SvgTag from "../../../../public/assets/svg/tag.svg"
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

const BannerContainer = styled.section`
  height: 500px;
  position: relative;
  border-bottom: ${props => props.theme.border};
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: 400px;
  }
`

const ContentTop = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
`

const ContentTopContent = styled.div`
  width: 100%;
  height: auto;
`

const Title = styled.h1`
  font-size: 30px;
  margin: 0;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    font-size: 36px;
  }
`

const SubTitle = styled.h2`
  font-size: 18px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    font-size: 24px;
  }
`

const OffersWrapper = styled.div`
  position: relative;
  margin-top: 36px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-top: 0;
  }
`

const OffersContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: ${props => props.theme.border};
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: ${props => props.theme.borderRadius}px;
  max-height: 200px;
  overflow: auto;
  padding-top: 12px;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  p {
    color: #fff;
    margin: 0;
  }
`

const OfferTitle = styled.p`
  position: absolute;
  left: -6px;
  top: -20px;
  font-weight: 700;
  margin: 0;
  padding: 6px 12px;
  background: #222;
  border-radius: ${props => props.theme.borderRadius}px;
`

const Text = styled.p`
  padding-left: 6px;
  font-size: 14px;
`

const OfferItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  svg {
    fill: #fff;
    width: 20px;
    height: 20px;
    display: block;
  }
`

const MenuPageBanner: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const shopData = useAppSelector(selectShop)
  const offersData = useAppSelector(selectOffers)

  return <BannerContainer>
    {shopData?.cover && <Image src={shopData.cover} loading="eager" layout="fill" objectFit="cover" />}
    <ContentTop>
      <ContentTopContent>
        <Container>
          <Row>
            <Col>
              <Title>{shopData?.name}</Title>
              <SubTitle>{shopData?.category_json[language]}</SubTitle>
              <MenuFeatures />
            </Col>
            <Col>
              <OffersWrapper>
                <OffersContainer>
                  <OfferTitle>OFFER</OfferTitle>
                  {offersData.map(i => {
                    return <OfferItem key={i.code}>
                      <SvgTag />
                      <Text><strong>{i.provided}% OFF - {i.code}</strong> {i.description_json && i.description_json[language]}</Text>
                    </OfferItem>
                  })}
                </OffersContainer>
              </OffersWrapper>
            </Col>
          </Row>
        </Container>
      </ContentTopContent>
    </ContentTop>
  </BannerContainer>
}

export default MenuPageBanner