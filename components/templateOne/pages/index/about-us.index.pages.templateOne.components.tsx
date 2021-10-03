import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import Image from 'next/image';
import { selectImages, selectShop } from '../../../../redux/slices/index.slices.redux';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguage } from '../../../../redux/slices/configuration.slices.redux';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import SvgRightArrow from '../../../../public/assets/svg/right-arrow.svg';
import CustomLink from '../../common/amplitude/customLink';

const WrapperSection = styled.section`
  border-bottom: ${(props) => props.theme.border};
  padding: ${(props) => props.theme.dimen.X4 * 8}px 0;
  background-color: #f9f9f9;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0.5rem 0;
  }
`;

const AboutUsContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.dimen.X4 * 2}px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: 402px;
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  padding: 0;
  text-align: center;
  margin: 0 0 ${(props) => props.theme.dimen.X4}px 0;
`;

const Description = styled.p`
  text-align: justify;
`;

const ImagesContainer = styled.div`
  border-top-right-radius: 48px;
  border-bottom-left-radius: 48px;
  overflow: hidden;
  position: relative;
`;

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
`;

const ImagesContainerHoverTextMore = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 34px !important;
  border-bottom: 2px solid ${(props) => props.theme.primaryColor};
  svg {
    margin-top: 6px;
    margin-left: 12px;
    width: 18px;
    fill: #fff;
  }
`;

const ImageContiner = styled.div`
  position: relative;
  height: 200px;
`;

const IndexPageAboutUs: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const shopData = useAppSelector(selectShop);
  const images = useAppSelector(selectImages);

  const imagesData = [];
  if (shopData?.cover_json?.images?.length) imagesData.push(shopData?.cover_json.images[0]);
  if (images[0]) imagesData.push(images[0]);
  if (images[1]) imagesData.push(images[1]);

  return (
    <WrapperSection>
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
                {(imagesData.length === 1 || imagesData.length >= 2) && (
                  <Col xs={12} style={{ paddingBottom: 2 }}>
                    <ImageContiner
                      style={{
                        height: imagesData.length === 1 ? '400px' : '200px',
                      }}
                    >
                      {imagesData[0] && <Image src={imagesData[0]} loading="lazy" layout="fill" objectFit="cover" />}
                    </ImageContiner>
                  </Col>
                )}

                {(imagesData.length === 2 || imagesData.length >= 3) && (
                  <Col xs={imagesData.length === 2 ? 12 : 6} style={{ paddingRight: 1 }}>
                    <ImageContiner>
                      {imagesData[1] && <Image src={imagesData[1]} loading="lazy" layout="fill" objectFit="cover" />}
                    </ImageContiner>
                  </Col>
                )}

                {imagesData.length >= 3 && (
                  <Col xs={6} style={{ paddingLeft: 1 }}>
                    <ImageContiner>
                      {imagesData[2] && <Image src={imagesData[2]} loading="lazy" layout="fill" objectFit="cover" />}
                    </ImageContiner>
                  </Col>
                )}
              </Row>

              <CustomLink
                href={`/gallery`}
                amplitude={{
                  text: 'gallery image',
                  type: 'image',
                }}
              >
                <ImagesContainerHover>
                  <ImagesContainerHoverTextMore>
                    More <SvgRightArrow />
                  </ImagesContainerHoverTextMore>

                  <p style={{ marginBottom: 14 }}>Gallery</p>
                </ImagesContainerHover>
              </CustomLink>
            </ImagesContainer>
          </Col>
        </Row>
      </Container>
    </WrapperSection>
  );
};

export default IndexPageAboutUs;
