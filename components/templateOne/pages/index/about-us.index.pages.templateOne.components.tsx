import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-grid-system";
import styled from "styled-components";
import Image from "next/image";
import { selectImages, selectShop } from "../../../../redux/slices/index.slices.redux";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { getLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";
import SvgRightArrow from "../../../../public/assets/svg/right-arrow.svg";


const WrapperSection = styled.section`
  border-bottom: ${props => props.theme.border};
  padding: ${props => props.theme.dimen.X4*4}px 0;
  background-color: #f9f9f9;
`

const AboutUsContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => props.theme.dimen.X4*2}px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: 402px;
    margin-bottom: 0;
  }
`

const Title = styled.h2`
  padding: 0;
  text-align: center;
  margin: 0 0 ${props => props.theme.dimen.X4}px 0;
`

const Description = styled.p`
text-align: justify;
`

const ImagesContainer = styled.div`
  border-top-right-radius: 48px;
  border-bottom-left-radius: 48px;
  overflow: hidden;
  position: relative;
`

const ImagesContainerHover = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  p {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    padding: 6px;
  }
`

const ImagesContainerHoverTextMore = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 34px!important;
  border-bottom: 2px solid ${props => props.theme.primaryColor};
  svg {
    margin-top: 6px;
    margin-left: 12px;
    width: 18px;
    fill: #fff;
  }
`

const ImageContiner = styled.div`
  position: relative;
  height: 200px;
`

const IndexPageAboutUs: FunctionComponent = ({}) => {
  const language = useAppSelector(getLanguage)
  const shopData = useAppSelector(selectShop)
  const imagesData = useAppSelector(selectImages)

  return <WrapperSection>
    <Container>
      <Row>
        <Col sm={12} lg={6}>
          <AboutUsContainer>
            <Title>{shopData?.description_title_json[language]}</Title>
            <Description>{shopData?.description_text_json[language]}</Description>
          </AboutUsContainer>
        </Col>
        <Col sm={12} lg={6}>
          <ImagesContainer>
            <Row>
              <Col xs={12} style={{ paddingBottom: 2}}>
                <ImageContiner>
                  <Image src={imagesData[0]} loading="lazy" layout="fill" objectFit="cover" />
                </ImageContiner>
              </Col>
              <Col xs={6} style={{ paddingRight: 1}}>
                <ImageContiner>
                  <Image src={imagesData[1]} loading="lazy" layout="fill" objectFit="cover" />
                </ImageContiner>
              </Col>
              <Col xs={6} style={{ paddingLeft: 1}}>
                <ImageContiner>
                  <Image src={imagesData[2]} loading="lazy" layout="fill" objectFit="cover" />
                </ImageContiner>
              </Col>
            </Row>
            <a href="/gallery">
              <ImagesContainerHover>
                <ImagesContainerHoverTextMore>More <SvgRightArrow /></ImagesContainerHoverTextMore>
                <p style={{ marginBottom: 14}}>Gallery</p>
              </ImagesContainerHover>
            </a>
          </ImagesContainer>
        </Col>
      </Row>
    </Container>
  </WrapperSection>

}

export default IndexPageAboutUs