import React, { FunctionComponent, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';
import { useAppSelector } from '../../redux/hooks.redux';
import { selectImages, selectShop } from '../../redux/slices/index.slices.redux';

const getConfig = (index: number) => {
  const val = (index % 5) + 1;
  switch (val) {
    case 5:
      return {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12,
      };
    case 1:
    case 4:
      return {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 7,
        xxl: 7,
      };
    case 3:
    case 2:
      return {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 5,
        xxl: 5,
      };
    default:
      return {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12,
      };
  }
};

const HeroContainer = styled.section`
  background: #f9f9f9;
  border-bottom: ${(props) => props.theme.border};
  position: relative;
  overflow: hidden;
  height: 200px;
  margin-bottom: ${(props) => props.theme.dimen.X4}px;
  @media (min-width: ${BREAKPOINTS.md}px) {
    height: 400px;
  }
`;

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
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
`;

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
`;

const Img = styled.img`
  height: 400px;
  width: 100%;
  object-fit: cover;
  display: block;
  margin: 15px 0;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: ${(props) => props.theme.border};
  background: #f9f9f9;
`;

const Close = styled.div`
  color: white;
  font-size: 2em;
  position: absolute;
  top: 8%;
  right: 5%;
  @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    right: 3%;
  }
  cursor: pointer;
`;

const ModalImageContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  background: rgba(0, 0, 0, 0.8);
  z-index: ${(p) => (p.visible ? '100' : '-1')};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(p) => (p.visible ? '1' : '0')};
  transition: opacity 0.2s ease-in;

  @media screen and (max-width: 600px) {
    top: 0;
    height: calc(100vh - ${(p) => p.theme.navMobile.height}px);
  }
`;

const ModalImage = styled.img`
  min-width: 40%;
  min-height: 40%;
  max-width: 60%;
  max-height: 60%;
  object-fit: cover;

  @media screen and (max-width: 600px) {
    min-width: 50%;
    min-height: 50%;
    max-width: 80%;
    max-height: 70%;
  }
  cursor: zoom-out;
`;

const GalleryPageTemplateOne: FunctionComponent = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  const { t } = useTranslation('header');
  const shopData = useAppSelector(selectShop);
  const imagesData = useAppSelector(selectImages);

  const handleImageClick = async (e: any) => {
    const index = e.target.alt.split('-')[1];
    setCurrentImg(imagesData[index]);
    setShowModal(true);
  };

  return (
    <>
      <HeroContainer>
        <HeroImage src={shopData?.place} loading="lazy" alt={shopData?.name} />
        <HeroContentContainer>
          <Container>
            <Row>
              <Col sm={12}>
                <h1>{t('@gallery')}</h1>
              </Col>
            </Row>
          </Container>
        </HeroContentContainer>
      </HeroContainer>

      <Container>
        <Row>
          {imagesData.map((imageSrc, index) => {
            const config = getConfig(index);
            return (
              <Col key={imageSrc} {...config}>
                <Img src={imageSrc} alt={`gallery-${index}`} loading="lazy" onClick={handleImageClick} />
              </Col>
            );
          })}
        </Row>
        <ModalImageContainer
          visible={showModal}
          onClick={() => {
            setCurrentImg('');
            setShowModal(false);
          }}
        >
          <Close>&#10006;</Close>
          <ModalImage src={currentImg} alt="modal" />
        </ModalImageContainer>
      </Container>
    </>
  );
};

export default GalleryPageTemplateOne;
