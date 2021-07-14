import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import { IContent } from '../../interfaces/common/index.common.interfaces';
import { useAppSelector } from '../../redux/hooks.redux';
import { selectContents, selectShop } from '../../redux/slices/index.slices.redux';
import { convertQuillToHtml } from '../../utils/offers.util';
import SvgPrevious from '../../public/assets/svg/previous.svg';
import SvgNext from '../../public/assets/svg/next.svg';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';

const Wrapper = styled.div`
  outline: none;
  border: none;
  height: max-content;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 0;
  }
`;

const HeroContainer = styled.section`
  background: #f9f9f9;
  border-bottom: ${(props) => props.theme.border};
  position: relative;
  overflow: hidden;
  height: 200px;
  margin-bottom: ${(props) => props.theme.dimen.X4}px;
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

const ContentContainer = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-bottom: 4rem;
    padding: 0.5rem;

    max-height: max-content;
  }
`;
const Content = styled.div`
  margin: 1rem;
  height: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 70%;
  border-radius: 0.5rem;
  margin: auto;
  padding: 2rem;
  overflow: hidden;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    flex-direction: column;
    width: 100%;
    overflow: auto;
    padding: 0;
  }
`;

const LeftSection = styled.div`
  height: 100%;
  position: relative;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
  }
`;

const RightSection = styled(LeftSection)`
  padding: 0 2rem;
  text-align: justify;
  overflow-x: hidden;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 1rem;
    overflow: none;
  }
`;

const TitleContainer = styled.div``;

const MainTitle = styled.h2`
  text-align: left;
  padding: 0;
  margin: 0;
`;

const Image = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`;

const LeftButton = styled.div<{ leftVisible: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;
  transition: 0.3s;
  cursor: ${(p) => (p.leftVisible ? 'pointer' : 'not-allowed')};
  margin-right: 0.5rem;

  svg {
    transition: 0.3s;
    fill: ${(p) => (p.leftVisible ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.4)')};
  }
`;

const RightButton = styled.div<{ rightVisible: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: ${(p) => (p.rightVisible ? 'pointer' : 'not-allowed')};
  transition: 0.3s;

  svg {
    transition: 0.3s;
    fill: ${(p) => (p.rightVisible ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.4)')};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 2rem;
  top: 2rem;
  z-index: 2;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    right: 1rem;
    bottom: -23rem;
    position: fixed;
  }
`;

const OffersPageTemplateOne: FunctionComponent = ({}) => {
  const shopData = useAppSelector(selectShop);
  const contents = useAppSelector(selectContents);
  const { t } = useTranslation('header');

  const [leftArrowVisible, setLeftArrowVisible] = useState(false);
  const [rightArrowVisible, setRightArrowVisible] = useState(contents.filter((c) => c.type_ === 'JSON').length > 1);
  const [currentContent, setCurrentContent] = useState<IContent | null>(null);
  let index = useRef(0);

  const handleLeftArrowClick = async () => {
    if (index.current <= 0) return;

    index.current -= 1;

    while (true) {
      if (contents[index.current].type_ !== 'PDF') {
        setCurrentContent(contents[index.current]);

        if (!contents[index.current - 1]) {
          setLeftArrowVisible(false);
          setRightArrowVisible(true);
        } else {
          setLeftArrowVisible(true);
          setRightArrowVisible(true);
        }

        return;
      }

      index.current -= 1;
    }
  };

  const handleRightArrowClick = async () => {
    if (!(contents.length - 1 > index.current)) return;

    index.current += 1;

    while (true) {
      if (contents[index.current]?.type_ !== 'PDF') {
        setCurrentContent(contents[index.current]);

        if (!contents[index.current + 1]) {
          setRightArrowVisible(false);
          setLeftArrowVisible(true);
        } else {
          setRightArrowVisible(true);
          setLeftArrowVisible(true);
        }

        return;
      }

      index.current += 1;
    }
  };

  const handleKeyPressClick = async (e: any) => {
    if (e.keyCode === 37) await handleLeftArrowClick();
    else if (e.keyCode === 39) await handleRightArrowClick();
  };

  useEffect(() => {
    if (contents.length) setCurrentContent(contents[index.current]);
  }, []);

  return (
    <Wrapper onKeyDown={handleKeyPressClick} tabIndex={-1}>
      <HeroContainer>
        <HeroImage src={shopData?.place} loading="lazy" alt={shopData?.name} />
        <HeroContentContainer>
          <Container>
            <Row>
              <Col sm={12}>
                <h1>{t('OFFERS')}</h1>
              </Col>
            </Row>
          </Container>
        </HeroContentContainer>
      </HeroContainer>

      <ContentContainer>
        {!!currentContent && (
          <Content>
            <LeftSection>
              <Image src={currentContent.image} alt="currentContent picture" />
              <ButtonContainer>
                <LeftButton onClick={handleLeftArrowClick} leftVisible={leftArrowVisible}>
                  <SvgPrevious />
                </LeftButton>
                <RightButton onClick={handleRightArrowClick} rightVisible={rightArrowVisible}>
                  <SvgNext />
                </RightButton>
              </ButtonContainer>
            </LeftSection>
            <RightSection>
              <TitleContainer>
                <MainTitle>{currentContent.title}</MainTitle>
              </TitleContainer>
              <div dangerouslySetInnerHTML={{ __html: convertQuillToHtml(JSON.parse(currentContent.description)?.ops) }} />
            </RightSection>
          </Content>
        )}
      </ContentContainer>
    </Wrapper>
  );
};

export default OffersPageTemplateOne;
