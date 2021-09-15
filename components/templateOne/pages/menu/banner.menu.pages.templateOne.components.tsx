import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectOffers, selectShop, selectSiblings } from '../../../../redux/slices/index.slices.redux';
import { Col, Container, Row } from 'react-grid-system';
import { selectLanguage, selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import MenuFeatures from './feature.menu.pages.templateOne.components';

import SvgTag from '../../../../public/assets/svg/tag.svg';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useTranslation } from 'next-i18next';

const WrapperContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    flex-direction: row;
  }
`;

const Wrapper = styled.div`
  display: flex;
  min-width: 100%;
  flex-direction: column;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    min-width: 400px;
  }
`;

const BannerContainer = styled.section`
  height: 500px;
  position: relative;
  border-bottom: ${(props) => props.theme.border};
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: 400px;
  }
`;

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
`;

const ContentTopContent = styled.div`
  width: 100%;
  height: auto;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 0;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    font-size: 40px;
  }
`;

const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
`;

const OffersWrapper = styled.div`
  position: relative;
  margin-top: 36px;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-top: 0;
  }
`;

const OffersContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);

  max-height: 200px;
  max-width: 450px;
  overflow: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  p {
    color: #fff;
    margin: 0;
  }
`;

// const OfferTitle = styled.p`
//   position: absolute;
//   left: -6px;
//   top: -20px;
//   font-weight: 700;
//   margin: 0;
//   padding: 6px 12px;
//   background: #222;
//   border-radius: ${(props) => props.theme.borderRadius}px;
// `;

const Text = styled.p`
  padding-left: 6px;
  font-size: 14px;
`;

const AmountOrPercent = styled.span`
  background: ${(p) => p.theme.primaryColor};
  color: ${(p) => p.theme.textDarkColor};
  padding: 0 0.5rem;
`;
const Code = styled.span`
  padding: 0 0.5rem;
`;
const Description = styled.p`
  padding: 0.2rem;
  font-size: 12px;
  margin: 0;
`;

const OfferItem = styled.div`
  padding: 0.5rem;
`;

const OfferBody = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: #fff;
    width: 20px;
    height: 20px;
    display: block;
  }
`;

const MenuPageBanner: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const shopData = useAppSelector(selectShop);
  const offersData = useAppSelector(selectOffers);
  const menuId = useAppSelector(selectSelectedMenu);
  const siblingData = useAppSelector(selectSiblings);
  const { t } = useTranslation('page-menu-id');

  let shopName: string | undefined;
  let shopCategory: string | undefined;
  const sibling = siblingData.filter((i) => i.id == menuId)[0];

  if (sibling) {
    shopName = sibling.name;
    shopCategory = sibling.category_json[language];
  } else {
    shopName = shopData?.name;
    shopCategory = shopData?.category_json[language];
  }

  return (
    <BannerContainer>
      {shopData?.cover && <Image src={shopData.cover} loading="eager" layout="fill" objectFit="cover" />}
      <ContentTop>
        <ContentTopContent>
          <Container>
            <Row>
              <Col>
                <WrapperContainer>
                  <Wrapper>
                    <Title>{shopName}</Title>
                    <SubTitle>{shopCategory}</SubTitle>
                    <MenuFeatures />
                  </Wrapper>

                  {/* {offersData.length > 0 && (
                    <Wrapper>
                      <OffersWrapper>
                        <OffersContainer>
                          <OfferTitle>{t('@offer')}</OfferTitle>
                          {offersData.map((i) => {
                            return (
                              <OfferItem key={i.code}>
                                <SvgTag />
                                <Text>
                                  <strong>
                                    {i.provided}% {t('@off')} - {i.code}
                                  </strong>{' '}
                                  {i.description_json && i.description_json[language]}
                                </Text>
                              </OfferItem>
                            );
                          })}
                        </OffersContainer>
                      </OffersWrapper>
                    </Wrapper>
                  )} */}

                  <Wrapper>
                    <OffersWrapper>
                      <OffersContainer>
                        {/* <OfferTitle>{t('@offer')}</OfferTitle> */}

                        <OfferItem>
                          <OfferBody>
                            <SvgTag />
                            <Text>
                              <AmountOrPercent>20%</AmountOrPercent>

                              <Code>
                                Use code <strong>FLEKSA</strong>
                              </Code>
                            </Text>
                          </OfferBody>

                          <Description>aut repudiandae impedit ullam! Quisquam, suscipit!</Description>
                        </OfferItem>
                      </OffersContainer>
                    </OffersWrapper>
                  </Wrapper>
                </WrapperContainer>
              </Col>
            </Row>
          </Container>
        </ContentTopContent>
      </ContentTop>
    </BannerContainer>
  );
};

export default MenuPageBanner;
