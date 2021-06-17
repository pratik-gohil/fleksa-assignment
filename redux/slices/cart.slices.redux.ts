import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '../store.redux'

const SLICE_NAME = "cart"

export interface ICartSliceState {
  
}

const initialState: ICartSliceState = {
  
}

export const CartSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateAddProduct(state, action) {
      // state.bearerToken = action.payload
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
  updateAddProduct
} = CartSlice.actions

export const selectCartItem = (state: RootState) => state.user.bearerToken