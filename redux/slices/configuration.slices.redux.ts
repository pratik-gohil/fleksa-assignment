import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '../store.redux'

const SLICE_NAME = "configuration"

enum LANGUAGES {
  de = "german",
  en = "english"
}

export interface IIndexSliceState {
  language: LANGUAGES
  configuration: {
    host: string
    baseUrlPyApi: string
  }
}

const initialState: IIndexSliceState = {
  language: LANGUAGES.de,
  configuration: {
    host: '',
    baseUrlPyApi: '',
  },
}

export const ConfigurationSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateLanguage(state, action) {
      state.language = (<any>LANGUAGES)[action.payload]
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

export const { updateLanguage } = ConfigurationSlice.actions

export const getLanguage = (state: RootState) => state.configuration.language
