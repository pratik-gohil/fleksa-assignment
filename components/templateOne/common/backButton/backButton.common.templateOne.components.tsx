import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import ArrowIconPath from '../../../../public/assets/svg/account/back-arrow.svg';

const HeaderSection = styled.div`
  flex: 1;
  display: none;
  width: 100%;
  max-height: 50px;
  margin: 1rem;

  align-items: center;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: flex;
  }
`;

const BackButton = styled.a`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const ArrowIcon = styled(ArrowIconPath)``;

const Title = styled.h3`
  padding: 0 1rem;
`;

interface IMobileBackButtonProps {
  path: string;
  title?: string;
}

const MobileBackButton: FunctionComponent<IMobileBackButtonProps> = ({ path, title }) => {
  return (
    <HeaderSection>
      <BackButton href={path}>
        <ArrowIcon />
      </BackButton>
      <Title>{title}</Title>
    </HeaderSection>
  );
};

export default MobileBackButton;
