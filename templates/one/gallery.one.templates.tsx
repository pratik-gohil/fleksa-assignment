import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { BREAKPOINTS } from "../../constants/grid-system-configuration";
import { useAppSelector } from "../../redux/hooks.redux";
import { selectImages, selectShop } from "../../redux/slices/index.slices.redux";

const getConfig = (index: number) => {
  const val = (index % 5) + 1
  switch (val) {
    case 5:
      return {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12,
      }
    case 1:
    case 4:
      return {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 7,
        xxl: 7,
      }
    case 3:
    case 2:
      return {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 5,
        xxl: 5,
      }
    default:
      return {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12,
      }
  }
}

const HeroContainer = styled.section`
  background: #f9f9f9;
  border-bottom: ${props => props.theme.border};
  position: relative;
  overflow: hidden;
  height: 200px;
  margin-bottom: ${props => props.theme.dimen.X4}px;
  @media (min-width: ${BREAKPOINTS.md}px) {
    height: 400px;
  }
`

const HeroContentContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: inherit;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(255,255,255,0) 100%);
`

const HeroImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`

const Img = styled.img`
  height: 400px;
  width: 100%;
  object-fit: cover;
  display: block;
  margin: 15px 0;
  border-radius: ${props => props.theme.borderRadius}px;
  border: ${props => props.theme.border};
  background: #f9f9f9;
`

const GalleryPageTemplateOne: FunctionComponent = ({}) => {
  const { t } = useTranslation("header")
  const shopData = useAppSelector(selectShop)
  const imagesData = useAppSelector(selectImages)

  return <>
    <HeroContainer>
      <HeroImage src={shopData?.place} loading="lazy" alt={shopData?.name} />
      <HeroContentContainer>
        <Container>
          <Row>
            <Col sm={12} >
              <h1>{t("@gallery")}</h1>
            </Col>
          </Row>
        </Container>
      </HeroContentContainer>
    </HeroContainer>
    <Container>
      <Row>
        {imagesData.map((imageSrc, index) => {
          const config = getConfig(index)
          return <Col key={imageSrc} {...config} >
            <Img src={imageSrc} loading="lazy" alt={shopData?.name} />
          </Col>
        })}
      </Row>
    </Container>
  </>
}

export default GalleryPageTemplateOne
