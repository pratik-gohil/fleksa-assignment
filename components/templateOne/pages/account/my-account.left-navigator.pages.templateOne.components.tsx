import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${(p) => p.theme.textDarkColor};
  width: 30%;
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
`;

export const MyAccountLeftSection = () => {
  return <Wrapper></Wrapper>;
};
