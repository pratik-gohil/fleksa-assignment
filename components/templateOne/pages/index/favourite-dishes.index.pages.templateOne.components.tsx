import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectProducts } from "../../../../redux/slices/index.slices.redux";

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
  border-radius: ${props => props.theme.dimen.X}px;
  height: 100%;
  width: 270px;
  height: 360px;

`

const IndexPageFavouriteDishes: FunctionComponent = ({}) => {
  
  const prductsData = useAppSelector(selectProducts)

  return <WrapperSection>
    <Container>
      <Row>
        <Col>
          <Title>OUR FAVOURITE DISHES</Title>
          <div>
            <Swiper
              slidesPerView={'auto'}
              centeredSlides={true}
              spaceBetween={16}
              pagination={{
                "clickable": true
              }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {prductsData.map(product => {
                return <SwiperSlide key={product.id} >
                  <Card>
                    <p>{product.name_json.english}</p>
                    <p>{product.description_json.english}</p>
                  </Card>
                </SwiperSlide>
              })}
            </Swiper>
          </div>
        </Col>
      </Row>
    </Container>
  </WrapperSection>

}

export default IndexPageFavouriteDishes