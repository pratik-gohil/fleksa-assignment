import React, { FunctionComponent, ReactNode } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';

import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectReviews } from '../../../../redux/slices/index.slices.redux';
import HorizontalList from '../../common/horizontal-list/horizontal-list.templateOne.component';
import HorizontalListItem, { IResponsive } from '../../common/horizontal-list/horizontal-list-item.templateOne.component';
import { useTranslation } from 'react-i18next';
import SvgStar from '../../../../public/assets/svg/star.svg';

const WrapperSection = styled.section`
  border-bottom: ${(props) => props.theme.border};
  text-align: center;
  padding: ${(props) => props.theme.dimen.X4 * 4}px 0;
`;

const Title = styled.h2`
  padding: 0;
  margin: 0 0 ${(props) => props.theme.dimen.X4 * 2}px 0;
`;

const Card = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  overflow: hidden;
  margin: 0 8px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  transition: transform 0.4s ease;

  p {
    padding: 0 ${(props) => props.theme.dimen.X4}px;
  }

  &:hover {
    transform: scale(1.01) translateY(-15px);
  }
`;

const StarContainer = styled.div``;

const responsive: IResponsive = {
  sm: {
    width: 300,
    height: 400,
  },
  md: {
    width: 300,
    height: 400,
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

const IndexPageCustomerReviews: FunctionComponent = ({}) => {
  const { t } = useTranslation('page-index');
  const reviewsData = useAppSelector(selectReviews);

  return !!reviewsData.length ? (
    <WrapperSection>
      <Container>
        <Row>
          <Col>
            <Title>{t('@customer-review-title')}</Title>
            <HorizontalList>
              {reviewsData.map((review, index) => {
                const stars: Array<ReactNode> = [];
                for (let index = 1; index <= 5; index++) {
                  stars.push(
                    <SvgStar
                      key={index}
                      style={{ margin: 6, width: 36, height: 36, fill: index <= Number(review.rating) ? 'rgb(255, 238, 50)' : '#eaeaea' }}
                    />,
                  );
                }

                return (
                  <HorizontalListItem key={index} responsive={responsive}>
                    <Card>
                      <div>
                        <img src={review.image} style={{ width: 48, height: 48, marginTop: 32 }} loading="lazy" />
                        <p style={{ fontWeight: 700 }}>{review.name}</p>
                        <StarContainer>{stars}</StarContainer>
                        <p style={{ textAlign: 'justify' }}>{review.description}</p>
                      </div>
                      <div>
                        <p style={{ textAlign: 'left' }}>Source: {review.source === 'GOOGLE_MAPS' ? 'Google Maps' : review.source}</p>
                      </div>
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

export default IndexPageCustomerReviews;
