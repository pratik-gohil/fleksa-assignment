import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Heading = styled.h1`
  text-align: center;
`;

const TermsPageTemplateOne: FunctionComponent = ({}) => {
  const { t } = useTranslation('page-imprint');

  return (
    <Container>
      <Row>
        <Col>
          <Heading>{t('@title')}</Heading>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsPageTemplateOne;
