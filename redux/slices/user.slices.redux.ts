import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { LS_BEARER_TOKEN } from '../../constants/local-storage-keys.constants'
import { RootState } from '../store.redux'

const SLICE_NAME = "user"

export interface IUserSliceState {
  bearerToken: string|null
}

const initialState: IUserSliceState = {
  bearerToken: typeof window === "undefined"? null: localStorage.getItem(LS_BEARER_TOKEN)
}

export const UserSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateBearerToken(state, action) {
      state.bearerToken = action.payload
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

export const { updateBearerToken } = UserSlice.actions

export const selectBearerToken = (state: RootState) => state.user.bearerToken
