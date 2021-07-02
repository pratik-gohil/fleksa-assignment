import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Title = styled.h1``;
const SubTitle = styled.h2``;

const Header: FunctionComponent = () => {
  const { t } = useTranslation('reservation');

  return (
    <Wrapper>
      <Title>{t('@title')}</Title>
      <SubTitle>{t('@sub-title')}</SubTitle>
    </Wrapper>
  );
};

export default Header;
