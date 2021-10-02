import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import AppButtons from '../../components/templateOne/common/appButtons/app-buttons.common.templateOne.components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';
import { useAppSelector } from '../../redux/hooks.redux';
import { selectLanguageCode } from '../../redux/slices/configuration.slices.redux';

const OrderPlacedImage = '/assets/svg/success/order_placed.svg';

const Wrapper = styled.div`
  height: calc(100vh - ${(props) => props.theme.navMobile.height}px);
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100vh - ${(props) => props.theme.navDesktop.height}px);
  }
`;

const Title = styled.h2`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    text-align: center;
  }
`;

const ViewManageButton = styled.a`
  display: inline-block;
  background-color: ${(props) => props.theme.textDarkColor};
  border: ${(props) => props.theme.border};
  padding: ${(props) => props.theme.dimen.X4}px;
  font-weight: 700;
  font-size: 18px;
  margin-top: 2rem;
  color: ${(props) => props.theme.textLightActiveColor};
`;

const Image = styled.img`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 80%;
  }
`;

const OrderPlacedPageTemplateOne: FunctionComponent = ({}) => {
  const languageCode = useAppSelector(selectLanguageCode);
  const { t } = useTranslation('page-order-placed');

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Title>{t('@greetings')}</Title>
            <Image src={OrderPlacedImage} alt="person jumping" />
            <ViewManageButton href={`/${languageCode}/account/order-history`}>{t('@manage')}</ViewManageButton>
            <AppButtons direction="row"
            // theme="light" 
            />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default OrderPlacedPageTemplateOne;
