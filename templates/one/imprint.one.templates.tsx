import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants/grid-system-configuration';
import { useAppSelector } from '../../redux/hooks.redux';
import { selectAddress, selectOwner, selectShop } from '../../redux/slices/index.slices.redux';

const fleksaLogoPath = 'assets/png/fleksa-logo-black.png';

const Wrapper = styled.div`
  width: 50%;
  margin: 2rem auto;
  padding: 2rem 1rem 1rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: calc(${(p) => p.theme.navDesktop.height}px + 1rem);
  border-radius: 0.5rem;
  min-height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);

  @media (max-width: ${BREAKPOINTS.sm}px) {
    border: none;
    width: 100%;
    margin-top: 0;
    padding: 1rem 0 0 0;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: clamp(2rem, 2.5rem, 5vw);
  margin-bottom: 1.5rem;
`;

const SubHeading = styled.h2`
  margin: 0;
  padding: 0;
  font-size: clamp(1rem, 1.5rem, 5vw);
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: clamp(1rem, 1.1rem, 5vw);
`;

const Logo = styled.img`
  max-width: 300px;
  max-height: 200px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    max-width: 200px;
    padding: 0.5rem;
    max-height: 150px;
  }
`;

const PoweredBy = styled.p`
  padding: 0;
  margin: 0.5rem 0;
  font-size: 1rem;
`;

const TermsPageTemplateOne: FunctionComponent = ({}) => {
  const { t } = useTranslation('page-imprint');

  const shopData = useAppSelector(selectShop);
  const addressData = useAppSelector(selectAddress);
  const ownerData = useAppSelector(selectOwner);

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col>
            <Heading>{t('@title')}</Heading>

            <Info>
              <Logo src={shopData?.logo} />
            </Info>

            <Info>
              <SubHeading>{t('@name')}</SubHeading>
              <Text>{shopData?.name}</Text>
            </Info>

            <Info>
              <SubHeading>{t('@address')}</SubHeading>
              <Text>
                {addressData?.area} {addressData?.address} <br /> {addressData?.postal_code} {addressData?.city}
              </Text>
            </Info>

            <Info>
              <SubHeading>{t('@contact')}</SubHeading>
              <Text>
                {t('@phone')} : +{addressData?.country_code}
                {addressData?.phone}
              </Text>
              <Text>Email : {addressData?.email}</Text>
            </Info>

            <Info>
              <SubHeading>{t('@owner')}</SubHeading>
              <Text>{ownerData.name}</Text>
            </Info>

            <Info>
              <PoweredBy>{t('@powered-by')}</PoweredBy>
              <Logo src={fleksaLogoPath} width={200} />
            </Info>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default TermsPageTemplateOne;
