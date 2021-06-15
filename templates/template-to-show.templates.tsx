import React, { ComponentType, FunctionComponent } from "react";
import { ScreenClassProvider } from "react-grid-system";
import { ThemeProvider } from "styled-components";
import PageContainer, { IPropsPageContainer } from "../components/templateOne/common/page-container.commom.templateOne.components";
import GlobalStyle from "../constants/global-style.constants";
import { THEME_ONE, THEME_TWO } from "../constants/theme.constants";
import { useAppSelector } from "../redux/hooks.redux";
import { selectShop } from "../redux/slices/index.slices.redux";

export interface IPropsTemplateToShow {
  templateList: Array<ComponentType>
  templateNumber: number
  pageContainer?: IPropsPageContainer
}

const themes = [
  THEME_ONE,
  THEME_TWO
]

const TemplateToShow: FunctionComponent<IPropsTemplateToShow> = ({ templateList, templateNumber, pageContainer }) => {

  const shop = useAppSelector(selectShop)

  const ViewTemaplte = templateList[templateNumber]
  return <ScreenClassProvider>
    <ThemeProvider theme={themes[!isNaN(Number(shop?.website_template))? 1: Number(shop?.website_template)]}>
      <GlobalStyle />
      <PageContainer {...pageContainer}>
        <ViewTemaplte />
      </PageContainer>
    </ThemeProvider>
  </ScreenClassProvider>
}

export default TemplateToShow