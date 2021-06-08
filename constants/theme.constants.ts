export interface IThemeNavDesktop {
  height: number
  backgroundColor: string
}

export interface IThemeNavMobile {
  height: number
  backgroundColor: string
}

export interface IThemeFooter {
  background: string
}

export interface IDimens {
  X: number
  X2: number
  X3: number
  X4: number
}

export interface ITheme {
  primaryColor: string
  border: string
  textLightColor: string
  textLightActiveColor: string
  textDarkColor: string
  textDarkActiveColor: string
  borderRadius: number
  navDesktop: IThemeNavDesktop
  navMobile: IThemeNavMobile
  footer: IThemeFooter
  dimen: IDimens
}

export const THEME_ONE: ITheme = {
  primaryColor: "rgb(255, 238, 50)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  textLightColor: "#ccc",
  textLightActiveColor: "#fff",
  textDarkColor: "#333",
  textDarkActiveColor: "#000",
  borderRadius: 6,
  navDesktop: {
    height: 70,
    backgroundColor: "#fff",
  },
  navMobile: {
    height: 70,
    backgroundColor: "#fff",
  },
  footer: {
    background: "#222"
  },
  dimen: {
    X: 4,
    X2: 8,
    X3: 12,
    X4: 16
  },
}

export const THEME_TWO: ITheme = THEME_ONE