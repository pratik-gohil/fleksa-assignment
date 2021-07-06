import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${(p) => p.theme.textDarkColor};
  width: 30%;
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  position: relative;

  ::after {
    content: '';
    width: 3rem;
    height: 100%;
    position: absolute;
    background: ${(p) => p.theme.primaryColor};
    top: 0;
    right: 0;
  }
`;

export const MyAccountLeftSection = () => {
  return <Wrapper></Wrapper>;
};
