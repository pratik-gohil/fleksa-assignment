// import { createSlice } from '@reduxjs/toolkit'
// import { HYDRATE } from 'next-redux-wrapper'

// const SLICE_NAME = "configuration"

// enum LANGUAGES {
//   GERMAN = "de",
//   ENGLISH = "en"
// }

// export interface IIndexSliceState {
//   language: LANGUAGES
//   configuration: {
//     host: string
//     baseUrlPyApi: string
//   }
// }

// const initialState: IIndexSliceState = {
//   language: LANGUAGES.GERMAN
// }

// const configurationSlice = createSlice({
//   name: SLICE_NAME,
//   initialState: {
//     language: 
//     configuration: {
//       host: '',
//       baseUrlPyApi: '',
//     },
//   },
//   reducers: {
//     updateConfiguration(state, action) {
//       state.configuration = action.payload
//     },
//   },
//   extraReducers: {
//     [HYDRATE]: (state, action) => {
//       return {
//         ...state,
//         ...(action.payload)[SLICE_NAME],
//       };
//     },
//   }
// })

// export const { updateConfiguration } = configurationSlice.actions

// export const getConfiguration = state => state.configuration.configuration

// export default configurationSlice.reducer
