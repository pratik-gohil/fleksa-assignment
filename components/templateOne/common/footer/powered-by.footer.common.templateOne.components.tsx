import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Text = styled.p`
  text-align: center;
  margin-top: 0;
`

const PoweredBy: FunctionComponent = () => {
  return <>
    <Text>Powered by</Text>
    <Text>©2021 Fleksa</Text>
  </>
}

export default PoweredBy