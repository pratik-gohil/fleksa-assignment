import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectOffers, selectShop, selectSiblings } from '../../../../redux/slices/index.slices.redux';
import { Col, Container, Row } from 'react-grid-system';
import { selectLanguage, selectSelectedMenu } from '../../../../redux/slices/configuration.slices.redux';
import MenuFeatures from './feature.menu.pages.templateOne.components';
import { IOffer } from '../../../../interfaces/common/offer.common.interfaces';
import { selectOrderType } from '../../../../redux/slices/checkout.slices.redux';

import SvgTag from '../../../../public/assets/svg/tag.svg';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { useTranslation } from 'next-i18next';

const WrapperContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    min-width: 100%;
  }
`;

const OfferWrapper = styled(Wrapper)`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding-top: 1rem;
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

const OffersContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);

  max-height: 200px;
  width: 450px;
  overflow: auto;
  margin-top: 0.5rem;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  p {
    color: #fff;
    margin: 0;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
  }
`;

const OfferTitle = styled.p`
  font-weight: 700;
  margin: 0;
  padding: 6px 12px;
  border-bottom: 1px solid ${(p) => p.theme.primaryColor};
  color: #fff;
  width: max-content;
`;

const Text = styled.p`
  padding-left: 6px;
  font-size: 14px;
`;

const AmountOrPercent = styled.span`
  background: ${(p) => p.theme.primaryColor};
  color: ${(p) => p.theme.textDarkColor};
  padding: 0 0.5rem;
  font-weight: bold;
`;
const Code = styled.span`
  padding: 0 0.5rem;

  strong {
    cursor: pointer;
    transition: background 0.2s linear;

    &:hover {
      background: #fff;
      color: ${(p) => p.theme.textDarkColor};
      padding: 0 0.5rem;
    }
  }
`;
const Description = styled.p`
  padding: 0.2rem;
  font-size: 12px;
  margin: 0;
  transition: all 0.2s;

  span {
    cursor: pointer;
    font-weight: bold;
    text-decoration: underline;
  }
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
  const orderType = useAppSelector(selectOrderType);
  const siblingData = useAppSelector(selectSiblings);
  const { t } = useTranslation('page-menu-id');

  const [moreDescription, setMoreDescription] = useState<string>('');
  const [offers, setOffers] = useState<IOffer[]>(offersData);

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

  /**
   * @param {text} string needs to copied
   */
  const handleCopyClick = async (text: string) => navigator.clipboard.writeText(text);

  /**
   *
   * @param desc update state of description expand
   * @returns Update
   */
  const handleDescriptionMoreClick = async (desc: string) => setMoreDescription(desc);

  /**
   * @description update offers depends on relavent ordery type selection
   */
  useEffect(() => {
    if (orderType) {
      const properTypeName = orderType === 'DINE_IN' ? 'DINEIN' : orderType; // ? change same order type name

      setOffers(
        offersData.filter((offer) => offer.order_type_ === properTypeName || offer.order_type_ === 'ALL' || offer.order_type_ === 'FIRST'),
      );
    }
  }, [orderType]);

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

                  {offers.length > 0 && (
                    <OfferWrapper>
                      <OfferTitle>{t('@offer')}</OfferTitle>

                      <OffersContainer>
                        {offers.map((offer, index) => (
                          <OfferItem key={index}>
                            <OfferBody>
                              <SvgTag />
                              <Text>
                                <AmountOrPercent>
                                  {offer.offer_type_ === 'PERCENTAGE'
                                    ? `${offer.provided}%`
                                    : offer.offer_type_ === 'AMOUNT'
                                    ? `${offer.provided} €`
                                    : ''}
                                </AmountOrPercent>

                                <Code>
                                  Off | Use code{' '}
                                  <strong title="Click to copy" onClick={async () => await handleCopyClick(offer.code)}>
                                    {offer.code}
                                  </strong>
                                </Code>
                              </Text>
                            </OfferBody>

                            <Description>
                              {(offer.description_json && offer.description_json?.[language].length < 60) ||
                              moreDescription === `desc-${index}` ? (
                                <>
                                  {`${offer.description_json?.[language]} `}

                                  {moreDescription === `desc-${index}` && (
                                    <span onClick={async () => await handleDescriptionMoreClick('')}>Less</span>
                                  )}
                                </>
                              ) : (
                                <>
                                  {offer.description_json?.[language].slice(0, 60)}
                                  <span onClick={async () => await handleDescriptionMoreClick(`desc-${index}`)}> ... More</span>
                                </>
                              )}
                            </Description>
                          </OfferItem>
                        ))}
                      </OffersContainer>
                    </OfferWrapper>
                  )}
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
