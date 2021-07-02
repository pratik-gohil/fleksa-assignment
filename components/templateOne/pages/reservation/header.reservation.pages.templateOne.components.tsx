import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  padding: 0.5rem 0 1rem 0;
`;
const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: clamp(1.3rem, 1.8rem, 3vw);
  padding: 0.7rem 0 0.3rem 0;
`;
const SubTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: clamp(0.8rem, 1rem, 2vw);
  font-weight: 400;
`;

const Header: FunctionComponent = () => {
  const { t } = useTranslation('reservation');

  return (
    <Wrapper>
      <Title>{t('Table Reservation')}</Title>
      <SubTitle>{t('We look forward to serving you')}</SubTitle>
    </Wrapper>
  );
};

export default Header;
