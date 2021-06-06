import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Text = styled.p`
  font-size: 14px;
  text-align: right;
  margin-top: 0;
`

const LegalLinks: FunctionComponent = () => {
  return <Text>
    <a href="http://">Terms & Conditions</a>
    {' '}|{' '}
    <a href="http://">Privacy Policy</a>
    {' '}|{' '}
    <a href="http://">Imprint</a>
  </Text>
}

export default LegalLinks