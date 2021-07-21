import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Text = styled.p`
  text-align: center;
  margin-top: 0;
`;

const PoweredByText = styled(Text)`
  img {
    width: auto;
    height: 20px;
    margin-bottom: -6px;
    margin-left: 12px;
    display: inline-block;
  }
`;

const PoweredBy: FunctionComponent = () => {
  return (
    <>
      <PoweredByText>
        Powered By
        <img src="/assets/svg/fleksa-logo.svg" />
      </PoweredByText>
      <Text>©2021 Fleksa</Text>
    </>
  );
};

export default PoweredBy;
