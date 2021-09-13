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

  color: #fff;
`;

const Logo = styled.img`
  width: auto;
  height: 30px;
  /* margin-bottom: -6px; */
  /* margin-left: 12px; */
  margin-top: 0.5rem;
  display: inline-block;
`;

const LogoLink = styled.a`
  display: block;
  margin: auto;
`;

// by
// fleksa logo

// Online-Bestellsystem
// by
// fleksa logo
const PoweredBy: FunctionComponent = () => {
  const { t } = useTranslation('footer');

  return (
    <>
      <Title>{t('@ordering-system')}</Title>

      <PoweredByText>{t('@powered-by')}</PoweredByText>

      <LogoLink href="https://fleksa.com">
        <Logo src="/assets/svg/fleksa-logo.svg" />
      </LogoLink>

      {/* <Text>©2021 Fleksa</Text> */}
    </>
  );
};

export default PoweredBy;
