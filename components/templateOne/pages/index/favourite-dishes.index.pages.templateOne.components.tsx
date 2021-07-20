import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import Image from 'next/image';

import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectProducts, selectSiblings } from '../../../../redux/slices/index.slices.redux';
import HorizontalList from '../../common/horizontal-list/horizontal-list.templateOne.component';
import HorizontalListItem, { IResponsive } from '../../common/horizontal-list/horizontal-list-item.templateOne.component';
import { useTranslation } from 'react-i18next';
import { selectLanguage, selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import formatCurrency from '../../../../utils/formatCurrency';

const WrapperSection = styled.section`
  padding: ${(props) => props.theme.dimen.X4 * 4}px 0;
`;

const Title = styled.h2`
  padding: 0;
  text-align: center;
  margin: 0 0 ${(props) => props.theme.dimen.X4 * 2}px 0;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  overflow: hidden;
  margin: 0 8px;
  height: 98%;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s linear;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: 240;
  }

  &:hover {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);

    transform: scale(1.09);
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
`;

const InfoContainerTop = styled.div``;

const ItemTitle = styled.h2`
  padding: 0 ${(props) => props.theme.dimen.X4}px;
  font-size: 20px;
`;

const ItemDescription = styled.p`
  padding: 0 ${(props) => props.theme.dimen.X4}px;
`;

const InfoContainerBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  p {
    font-weight: 700;
    margin: ${(props) => props.theme.dimen.X4}px 0;
    &:first-child {
      margin-left: ${(props) => props.theme.dimen.X4}px;
    }
    &:last-child {
      margin-right: ${(props) => props.theme.dimen.X4}px;
    }
  }
`;

const ItemPrice = styled.p`
  font-size: 20px;
`;

const ItemToProduct = styled.a`
  p {
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.primaryColor};
    padding: ${(props) => props.theme.dimen.X2}px ${(props) => props.theme.dimen.X4}px;

    span {
      font-weight: 900;
      font-size: 22px;
      height: 21px;
      margin-top: -4px;
      margin-left: 6px;
      line-height: 1;
    }
  }
`;

const responsive: IResponsive = {
  sm: {
    width: 300,
    height: 460,
  },
  md: {
    width: 300,
    height: 460,
  },
  lg: {
    width: 360,
    height: 480,
  },
  xl: {
    width: 360,
    height: 480,
  },
  xxl: {
    width: 360,
    height: 480,
  },
};

const IndexPageFavouriteDishes: FunctionComponent = ({}) => {
  const { t } = useTranslation('page-index');
  const language = useAppSelector(selectLanguage);
  const siblingsData = useAppSelector(selectSiblings);
  const productsData = useAppSelector(selectProducts);
  const languageCode = useAppSelector(selectLanguageCode)

  return !!productsData.length && siblingsData.length <= 1 ? (
    <WrapperSection>
      <Container>
        <Row>
          <Col>
            <Title>{t('@favourite-dishes-title')}</Title>

            <HorizontalList childCount={productsData.length}>
              {productsData.map((product) => {
                return (
                  <HorizontalListItem key={product.id} responsive={responsive}>
                    <Card>
                      <ImageContainer>{product.image && <Image src={product.image} layout="fill" loading="lazy" objectFit="cover" />}</ImageContainer>

                      <InfoContainer>
                        <InfoContainerTop>
                          <ItemTitle>{product.name_json[language]}</ItemTitle>
                          <ItemDescription>{product.description_json[language]}</ItemDescription>
                        </InfoContainerTop>

                        <InfoContainerBottom>
                          <ItemPrice>{formatCurrency(product.price, languageCode)}</ItemPrice>

                          <ItemToProduct href="/menu">
                            <p>
                              {t('@to-product')} <span>+</span>
                            </p>
                          </ItemToProduct>
                        </InfoContainerBottom>
                      </InfoContainer>
                    </Card>
                  </HorizontalListItem>
                );
              })}
            </HorizontalList>
          </Col>
        </Row>
      </Container>
    </WrapperSection>
  ) : null;
};

export default IndexPageFavouriteDishes;
