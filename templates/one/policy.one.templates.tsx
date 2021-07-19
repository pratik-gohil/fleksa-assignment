import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Heading1 = styled.h1`
  text-align: center;
`;

const Heading2 = styled.h2``;

const Description = styled.p``;

const TermsPageTemplateOne: FunctionComponent = ({}) => {
  const { t } = useTranslation('page-policy');

  return (
    <Container>
      <Row>
        <Col>
          <Heading1>{t('@title')}</Heading1>

          <Heading2>{t('@title-scope-defense-clause')}</Heading2>
          <Description>{t('@description-scope-defense-clause-1')}</Description>
          <Description>{t('@description-scope-defense-clause-2')}</Description>

          <Heading2>{t('@title-formation-of-contract')}</Heading2>
          <Description>{t('@description-formation-of-contract-1')}</Description>
          <Description>{t('@description-formation-of-contract-2')}</Description>
          <Description>{t('@description-formation-of-contract-3')}</Description>
          <Description>{t('@description-formation-of-contract-4')}</Description>
          <Description>{t('@description-formation-of-contract-5')}</Description>
          <Description>{t('@description-formation-of-contract-6')}</Description>
          <Description>{t('@description-formation-of-contract-7')}</Description>
          <Description>{t('@description-formation-of-contract-8')}</Description>

          <Heading2>{t('@title-delivery')}</Heading2>
          <Description>{t('@description-delivery-1')}</Description>
          <Description>{t('@description-delivery-2')}</Description>
          <Description>{t('@description-delivery-3')}</Description>
          <Description>{t('@description-delivery-4')}</Description>

          <Heading2>{t('@title-retention-of-title')}</Heading2>
          <Description>{t('@description-retention-of-title-1')}</Description>

          <Heading2>{t('@title-warranty-liability-of-defects')}</Heading2>
          <Description>{t('@description-warranty-liability-of-defects-1')}</Description>
          <Description>{t('@description-warranty-liability-of-defects-2')}</Description>
          <Description>{t('@description-warranty-liability-of-defects-3')}</Description>
          <Description>{t('@description-warranty-liability-of-defects-4')}</Description>

          <Heading2>{t('@title-disclaimer')}</Heading2>
          <Description>{t('@description-disclaimer-1')}</Description>
          <Description>{t('@description-disclaimer-2')}</Description>
          <Description>{t('@description-disclaimer-3')}</Description>

          <Heading2>{t('@title-choice-law-place-jurisdiction')}</Heading2>
          <Description>{t('@description-choice-law-place-jurisdiction-1')}</Description>
          <Description>{t('@description-choice-law-place-jurisdiction-2')}</Description>
          <Description>{t('@description-choice-law-place-jurisdiction-3')}</Description>

          <Heading2>{t('@title-revocation')}</Heading2>
          <Description>{t('@description-revocation-1')}</Description>

          <Heading2>{t('@title-cancellation')}</Heading2>
          <Description>{t('@description-cancellation-1')}</Description>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsPageTemplateOne;
