import { useTranslation } from "next-i18next";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Text = styled.p`
  text-align: center;
  margin-top: 0;
`

const PoweredByText = styled(Text)`
  img {
    width: auto;
    height: 20px;
    margin-bottom: -6px;
    margin-left: 12px;
    display: inline-block;
  }
`

const PoweredBy: FunctionComponent = () => {
  const { t } = useTranslation('footer');
  
  return <>
    <PoweredByText>
      {t('@powered-by')}
      <img src="assets/svg/fleksa-logo.svg" />
    </PoweredByText>
    <Text>©2021 Fleksa</Text>
  </>
}

export default PoweredBy