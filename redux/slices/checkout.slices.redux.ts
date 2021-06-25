import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '../store.redux'

const SLICE_NAME = "checkout"

export type ICheckoutPaymentMethods = "CASH" | "CARD" | "PAYPAL"

export interface ICheckoutSliceState {
  paymentMethod: ICheckoutPaymentMethods
  tip: number|null
}

const initialState: ICheckoutSliceState = {
  paymentMethod: "CASH",
  tip: null,
}

export const CheckoutSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updatePaymentMethod(state, action) {
      state.paymentMethod = action.payload
    },
    updateTip(state, action) {
      state.tip = action.payload
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
  updatePaymentMethod,
  updateTip,
} = CheckoutSlice.actions

export const selectPaymentMethod = (state: RootState) => state.checkout.paymentMethod
export const selectTip = (state: RootState) => state.checkout.tip