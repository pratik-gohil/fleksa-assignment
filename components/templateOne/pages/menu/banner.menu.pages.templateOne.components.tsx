import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectShop } from "../../../../redux/slices/index.slices.redux";
import { Col, Container, Row } from "react-grid-system";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";

const BannerContainer = styled.section`
  height: 400px;
  position: relative;
  border-bottom: ${props => props.theme.border};
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
  font-size: 36px;
  margin: 0;
`

const SubTitle = styled.h2`
  font-size: 24px;
`


const MenuPageBanner: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const shopData = useAppSelector(selectShop)

  return <BannerContainer>
    {shopData?.cover && <Image src={shopData.cover} loading="eager" layout="fill" objectFit="cover" />}
    <ContentTop>
      <ContentTopContent>
        <Container>
          <Row>
            <Col>
              <Title>{shopData?.name}</Title>
              <SubTitle>{shopData?.category_json[language]}</SubTitle>
            </Col>
          </Row>
        </Container>
      </ContentTopContent>
    </ContentTop>
  </BannerContainer>
}

export default MenuPageBanner