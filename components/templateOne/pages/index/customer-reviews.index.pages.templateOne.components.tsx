import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import Image from "next/image";

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectReviews } from "../../../../redux/slices/index.slices.redux";
import HorizontalList from "../../common/horizontal-list/horizontal-list.templateOne.component";
import HorizontalListItem, { IResponsive } from "../../common/horizontal-list/horizontal-list-item.templateOne.component";
import { useTranslation } from "react-i18next";

const WrapperSection = styled.section`
  border-bottom: ${props => props.theme.border};
  text-align: center;
  padding: ${props => props.theme.dimen.X4*4}px 0;
`

const Title = styled.h2`
  padding: 0;
  margin: 0 0 ${props => props.theme.dimen.X4*2}px 0;
`

const Card = styled.div`
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  overflow: hidden;
  margin: 0 8px;
  height: 100%;
`

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
  }
}

const IndexPageCustomerReviews: FunctionComponent = ({}) => {
  const { t } = useTranslation("page-index")
  const reviewsData = useAppSelector(selectReviews)

  return <WrapperSection>
    <Container>
      <Row>
        <Col>
          <Title>{t("@customer-review-title")}</Title>
          <HorizontalList>
            {reviewsData.map((product, index) => {
              return <HorizontalListItem key={index} responsive={responsive}>
                <Card>
                  <div style={{ width: "100%", height: 200, position: 'relative' }}>
                    <Image src={product.image} layout="fill" loading="lazy" objectFit="cover" />
                  </div>
                  <p>{product.name}</p>
                  <p>{product.description}</p>
                </Card>
              </HorizontalListItem>
            })}
          </HorizontalList>
        </Col>
      </Row>
    </Container>
  </WrapperSection>

}

export default IndexPageCustomerReviews