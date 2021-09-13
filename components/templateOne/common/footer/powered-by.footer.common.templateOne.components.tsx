import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Text = styled.p`
  text-align: center;
  padding: 0;
  margin: 0;
  font-size: 14px;
`;

const PoweredByText = styled(Text)`
  font-size: 15px;
`;

const Title = styled.a`
  padding: 0;
  margin: 0;
  text-align: center;
  display: block;
  font-size: 17px;
  font-weight: bolder;
  cursor: pointer;

  color: #fff;
`;

const Logo = styled.img`
  width: auto;
  height: 25px;
  margin-top: 5px;

  display: inline-block;
`;

const LogoLink = styled.a`
  display: block;
  margin: auto;
  cursor: pointer;
`;

const PoweredBy: FunctionComponent = () => {
  const { t } = useTranslation('footer');

  return (
    <>
      <Title href="https://fleksa.com">{t('@ordering-system')}</Title>

      <PoweredByText>{t('@powered-by')}</PoweredByText>

      <LogoLink href="https://fleksa.com" target="_blank">
        <Logo src="/assets/svg/fleksa-logo.svg" />
      </LogoLink>
    </>
  );
};

export default PoweredBy;
