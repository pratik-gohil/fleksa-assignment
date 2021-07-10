import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';
import { useAppSelector } from '../../redux/hooks.redux';
import { selectShop } from '../../redux/slices/index.slices.redux';

const Wrapper = styled.div`
  height: calc(100vh - ${(props) => props.theme.navMobile.height}px);
  width: 100%;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100vh - ${(props) => props.theme.navDesktop.height}px);
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

const OffersPageTemplateOne: FunctionComponent = ({}) => {
  const shopData = useAppSelector(selectShop);
  const { t } = useTranslation('header');

  return (
    <Wrapper>
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

      {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
    </Wrapper>
  );
};

export default OffersPageTemplateOne;
