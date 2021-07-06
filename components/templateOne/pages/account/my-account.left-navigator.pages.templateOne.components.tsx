import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${(p) => p.theme.textDarkColor};
  width: 30%;
`;

export const MyAccountLeftSection = () => {
  return <Wrapper>left</Wrapper>;
};
