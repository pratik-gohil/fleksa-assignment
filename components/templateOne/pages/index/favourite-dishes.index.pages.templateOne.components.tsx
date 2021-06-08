import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import Image from "next/image";

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectProducts } from "../../../../redux/slices/index.slices.redux";
import HorizontalList from "../../common/horizontal-list/horizontal-list.templateOne.component";
import HorizontalListItem, { IResponsive } from "../../common/horizontal-list/horizontal-list-item.templateOne.component";

const WrapperSection = styled.section`
  border-bottom: ${props => props.theme.border};
  padding: ${props => props.theme.dimen.X4*4}px 0;
`

const Title = styled.h2`
  padding: 0;
  text-align: center;
  margin: 0 0 ${props => props.theme.dimen.X4*2}px 0;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  overflow: hidden;
  margin: 0 8px;
  height: 100%;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
`

const InfoContainerTop = styled.div`

`

const ItemTitle = styled.h2`
  padding: 0 ${props => props.theme.dimen.X4}px;
  font-size: 20px;
`

const ItemDescription = styled.p`
  padding: 0 ${props => props.theme.dimen.X4}px;
`

const InfoContainerBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    font-weight: 700;
    margin: ${props => props.theme.dimen.X4}px;
  }
`

const ItemPrice = styled.p`
  font-size: 26px;
`

const ItemToProduct = styled.a`
  p {
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.primaryColor};
    border-radius: ${props => props.theme.borderRadius}px;
    padding: ${props => props.theme.dimen.X2}px ${props => props.theme.dimen.X4}px;
    border: ${props => props.theme.border};
    span {
      font-weight: 900;
      font-size: 22px;
      height: 21px;
      margin-top: -4px;
      margin-left: 6px;
      line-height: 1;
    }
  }
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

const IndexPageFavouriteDishes: FunctionComponent = ({}) => {
  const prductsData = useAppSelector(selectProducts)

  return <WrapperSection>
    <Container>
      <Row>
        <Col>
          <Title>OUR FAVOURITE DISHES</Title>
          <HorizontalList>
            {prductsData.map((product) => {
              return <HorizontalListItem key={product.id} responsive={responsive}>
                <Card>
                  <div style={{ width: "100%", height: 240, position: 'relative' }}>
                    <Image src={product.image} layout="fill" loading="lazy" objectFit="cover" />
                  </div>
                  <InfoContainer>
                    <InfoContainerTop>
                      <ItemTitle>{product.name_json.english}</ItemTitle>
                      <ItemDescription>{product.description_json.english}</ItemDescription>
                    </InfoContainerTop>
                    <InfoContainerBottom>
                      <ItemPrice>€{product.price}</ItemPrice>
                      <ItemToProduct href="/menu">
                        <p>To Product <span>+</span></p>
                      </ItemToProduct>
                    </InfoContainerBottom>
                  </InfoContainer>
                </Card>
              </HorizontalListItem>
            })}
          </HorizontalList>
        </Col>
      </Row>
    </Container>
  </WrapperSection>

}

export default IndexPageFavouriteDishes