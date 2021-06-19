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
  showLogin: boolean
  configuration: IConfiguration
}

const initialState: IIndexSliceState = {
  language: LANGUAGES.de,
  showLogin: false,
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
      state.language = (<any>LANGUAGES)[action.payload]
    },
    updateShowLogin(state, action) {
      state.showLogin = action.payload
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

export const { updateLanguage, updateShowLogin, updateConfiguration } = ConfigurationSlice.actions

export const selectLanguage = (state: RootState) => state.configuration.language
export const selectShowLogin = (state: RootState) => state.configuration.showLogin
export const selectConfiguration = (state: RootState) => state.configuration.configuration