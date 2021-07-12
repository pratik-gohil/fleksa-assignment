import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import Image from 'next/image';

import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectSiblings } from '../../../../redux/slices/index.slices.redux';
import HorizontalList from '../../common/horizontal-list/horizontal-list.templateOne.component';
import HorizontalListItem, { IResponsive } from '../../common/horizontal-list/horizontal-list-item.templateOne.component';
import { useTranslation } from 'react-i18next';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { selectLanguage } from '../../../../redux/slices/configuration.slices.redux';
import { useRouter } from 'next/router';

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
  height: 98%;
  margin: 0 8px;
  cursor: pointer;

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
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
`;

const InfoContainerTop = styled.div``;

const ItemTitle = styled.h2`
  font-size: 18px;
  margin: 1rem 0 0 0;
  padding: 0 1rem;
  font-weight: 600;
`;

const InfoContainerBottom = styled.div`
  /* position: absolute; */
  /* bottom: 1.5rem; */
  width: 100%;
  /* margin: 0 1rem; */
  padding: 0 0.5rem;
`;

const ItemToProduct = styled.button`
  /* margin: 2rem; */
  width: 100%;
  /* padding: ${(props) => props.theme.dimen.X2}px ${(props) => props.theme.dimen.X4}px; */
  /* font-weight: 500; */
  background-color: ${(props) => props.theme.primaryColor};
  font-weight: 700;
  font-size: 24px;
  color: #222;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: ${(props) => props.theme.border};
  padding: 12px 24px;
  display: block;
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

const InfoCategory = styled.div``;
const CategoryName = styled.p`
  padding: 0 1rem;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.5);
`;

const InfoContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  width: 50px;
  height: 40px;
  margin-right: 0.5rem;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const responsive: IResponsive = {
  sm: {
    width: 300,
    height: 370,
  },
  md: {
    width: 300,
    height: 370,
  },
  lg: {
    width: 300,
    height: 370,
  },
  xl: {
    width: 300,
    height: 370,
  },
  xxl: {
    width: 360,
    height: 370,
  },
};

const IndexMultiRestaurantShowCase: FunctionComponent = ({}) => {
  const { t } = useTranslation('page-index');
  const siblings = useAppSelector(selectSiblings);
  const language = useAppSelector(selectLanguage);
  const router = useRouter();

  return !!siblings.length ? (
    <WrapperSection>
      <Container>
        <Row>
          <Col>
            <Title>{t('OTHER RESTAURANTS')}</Title>

            <HorizontalList childCount={siblings.length}>
              {siblings.map((sibling) => {
                return (
                  <HorizontalListItem key={sibling.id} responsive={responsive}>
                    <Card onClick={() => router.push(`/menu/${sibling.id}`)}>
                      <ImageContainer>
                        {sibling.logo && (
                          <Image
                            src={'https://fleksa-image.s3.eu-central-1.amazonaws.com/img/restaurant_covers/mr9l43014dqbp6xo9xf2fa51uwz.jpg'}
                            layout="fill"
                            loading="lazy"
                            objectFit="cover"
                          />
                        )}
                      </ImageContainer>

                      <InfoContainer>
                        <InfoContainerTop>
                          <ItemTitle>{sibling.name}</ItemTitle>
                        </InfoContainerTop>

                        <InfoContainerCenter>
                          <InfoCategory>
                            <CategoryName>{sibling.category_json[language]}</CategoryName>
                          </InfoCategory>
                          <LogoContainer>
                            <Logo src={sibling.logo} />
                          </LogoContainer>
                        </InfoContainerCenter>

                        <InfoContainerBottom>
                          <ItemToProduct>{t('@order-online')}</ItemToProduct>
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

export default IndexMultiRestaurantShowCase;
