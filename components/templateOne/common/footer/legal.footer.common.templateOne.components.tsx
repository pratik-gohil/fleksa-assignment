import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

const Text = styled.p`
  text-align: right;
  font-size: 12px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    font-size: 14px;
    margin-top: 0;
  }
`

const LegalLinks: FunctionComponent = () => {
  return <Text>
    <a href="/terms">Terms & Conditions</a>
    {' '}|{' '}
    <a href="/privacy-policy">Privacy Policy</a>
    {' '}|{' '}
    <a href="/imprint">Imprint</a>
  </Text>
}

export default LegalLinks