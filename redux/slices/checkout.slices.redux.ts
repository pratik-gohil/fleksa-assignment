import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '../store.redux'

const SLICE_NAME = "checkout"

export type ICheckoutPaymentMethods = "CASH" | "CARD" | "PAYPAL"
export type ICheckoutOrderTypes = "PICKUP" | "DELIVERY" | "DINE_IN"

export interface ICheckoutSliceState {
  orderType: ICheckoutOrderTypes|null
  paymentMethod: ICheckoutPaymentMethods
  tip: number|null
  amountToPay: number|null
}

const initialState: ICheckoutSliceState = {
  orderType: null,
  paymentMethod: "CASH",
  tip: null,
  amountToPay: null
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
    updateOrderType(state, action) {
      state.orderType = action.payload
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
export const selectOrderType = (state: RootState) => state.checkout.orderType