export interface IThemeNavDesktop {
  height: number;
  backgroundColor: string;
}

export interface IThemeNavMobile {
  height: number;
  backgroundColor: string;
}

export interface IThemeFooter {
  background: string;
}

export interface IDimens {
  X: number;
  X2: number;
  X3: number;
  X4: number;
}

export interface ITheme {
  primaryColorRed: number;
  primaryColorGreen: number;
  primaryColorBlue: number;
  primaryColor: string;
  fontFamily: string;
  border: string;
  textLightColor: string;
  textLightActiveColor: string;
  textDarkColor: string;
  textDarkActiveColor: string;
  borderRadius: number;
  navDesktop: IThemeNavDesktop;
  navMobile: IThemeNavMobile;
  footer: IThemeFooter;
  dimen: IDimens;
}

export const THEME_ONE: ITheme = {
  primaryColorRed: 255,
  primaryColorGreen: 238,
  primaryColorBlue: 50,
  primaryColor: 'rgb(255, 238, 50)',
  fontFamily:
    "'Poppins', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  border: '1px solid rgba(0, 0, 0, 0.1)',
  textLightColor: '#ccc',
  textLightActiveColor: '#fff',
  textDarkColor: '#333',
  textDarkActiveColor: '#000',
  borderRadius: 6,
  navDesktop: {
    height: 80,
    backgroundColor: '#fff',
  },
  navMobile: {
    height: 60,
    backgroundColor: '#444',
  },
  footer: {
    background: '#222',
  },
  dimen: {
    X: 4,
    X2: 8,
    X3: 12,
    X4: 12,
  },
};

export const THEME_TWO: ITheme = {
  ...THEME_ONE,
};
