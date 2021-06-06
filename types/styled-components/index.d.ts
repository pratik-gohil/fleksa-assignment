import { ITheme } from "../../constants/theme.constants";

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}