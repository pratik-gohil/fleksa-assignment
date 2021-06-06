import React, { ComponentType, FunctionComponent } from "react";
import { ScreenClassProvider } from "react-grid-system";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../constants/global-style.constants";
import { THEME_ONE, THEME_TWO } from "../constants/theme.constants";

export interface IPropsTemplateToShow {
  templateList: Array<ComponentType>
  templateNumber: number
}

const themes = [
  THEME_ONE,
  THEME_TWO
]

const TemplateToShow: FunctionComponent<IPropsTemplateToShow> = ({ templateList, templateNumber, children }) => {
  const ViewTemaplte = templateList[templateNumber]
  return <ScreenClassProvider>
    <ThemeProvider theme={themes[0]}>
      <GlobalStyle />
      <ViewTemaplte>
        {children}
      </ViewTemaplte>
    </ThemeProvider>
  </ScreenClassProvider>
}

export default TemplateToShow