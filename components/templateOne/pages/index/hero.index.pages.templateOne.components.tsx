import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import Image from "next/image"

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectShop } from "../../../../redux/slices/index.slices.redux";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

const WrapperSection = styled.section`
  height: calc(100vh - ${props => props.theme.navMobile.height}px);
  position: relative;
  @media (min-width: ${BREAKPOINTS.md}px) {
    height: calc(100vh - ${props => props.theme.navDesktop.height}px);
  }
`

const ImageContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const ContentContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,0.4962359943977591) 0%, rgba(255,255,255,0) 100%);
  color: #fff;
  display: flex;
  flex: 1;
  flex-shrink: 0;
  flex-grow: 1;
  /* flex-direction: column;
  align-items: center; */
  div {
    width: 100%;
  }
`

const Title = styled.h1`
  font-size: 64px;
`

const SubTitle = styled.h2`

`

const OrderButton = styled.a`
  
`

const IndexPageHero: FunctionComponent = ({}) => {
  
  const shopData = useAppSelector(selectShop)

  return <WrapperSection>
    <ImageContainer>
      <Image src={shopData?.cover||""} layout="fill" loading="eager" objectFit="cover" />
    </ImageContainer>
    <ContentContainer>
      <Container>
        <Row>
          <Col>
            <Title>{shopData?.name}</Title>
            <SubTitle>{shopData?.category_json.german}</SubTitle>
            <OrderButton />
          </Col>
        </Row>
      </Container>
    </ContentContainer>
  </WrapperSection>

}

export default IndexPageHero