import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '../store.redux'

const SLICE_NAME = "configuration"

enum LANGUAGES {
  de = "german",
  en = "english"
}

export interface IConfiguration {
  host: string
  baseUrlPyApi: string
  baseUrlNodeApi: string
}

export interface IIndexSliceState {
  language: LANGUAGES
  languageCode: string
  showLogin: boolean
  showLoginOnLoginPath: string|null
  showCart: boolean
  selectedMenu: number|null
  selectedMenuUrlpath: string|null
  configuration: IConfiguration
}

const initialState: IIndexSliceState = {
  language: LANGUAGES.de,
  languageCode: "de",
  showLogin: false,
  showLoginOnLoginPath: null,
  showCart: false,
  selectedMenu: null,
  selectedMenuUrlpath: null,
  configuration: {
    host: '',
    baseUrlPyApi: '',
    baseUrlNodeApi: '',
  },
}

export const ConfigurationSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateLanguage(state, action) {
      state.languageCode = action.payload
      state.language = (<any>LANGUAGES)[action.payload]
    },
    updateShowLogin(state, action) {
      state.showLogin = action.payload
    },
    updateShowLoginOnLoginPath(state, action) {
      state.showLoginOnLoginPath = action.payload
    },
    updateShowCart(state, action) {
      state.showCart = action.payload
    },
    updateSelectedMenu(state, action) {
      state.selectedMenu = action.payload
    },
    updateSelectedMenuUrlpath(state, action) {
      state.selectedMenuUrlpath = action.payload
    },
    updateConfiguration(state, action) {
      state.configuration = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...(action.payload)[SLICE_NAME],
      };
    },
  }
})

export const {
  updateLanguage,
  updateShowLogin,
  updateConfiguration,
  updateSelectedMenu,
  updateShowCart,
  updateSelectedMenuUrlpath,
} = ConfigurationSlice.actions

export const selectLanguage = (state: RootState) => state.configuration.language
export const selectLanguageCode = (state: RootState) => state.configuration.languageCode
export const selectShowLogin = (state: RootState) => state.configuration.showLogin
export const selectShowLoginOnLoginPath = (state: RootState) => state.configuration.showLoginOnLoginPath
export const selectShowCart = (state: RootState) => state.configuration.showCart
export const selectSelectedMenu = (state: RootState) => state.configuration.selectedMenu
export const selectConfiguration = (state: RootState) => state.configuration.configuration
export const selectSelectedMenuUrlpath = (state: RootState) => state.configuration.selectedMenuUrlpath