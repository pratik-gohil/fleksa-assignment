import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ILabelValue } from '../../utils/restaurant-timings.utils';
import { RootState } from '../store.redux';

const SLICE_NAME = 'checkout';

export type ICheckoutPaymentMethods = 'CASH' | 'STRIPE' | 'PAYPAL';
export type ICheckoutOrderTypes = 'PICKUP' | 'DELIVERY' | 'DINE_IN' | 'RESERVATION';

export interface ICheckoutSliceState {
  orderType: ICheckoutOrderTypes | null;
  paymentMethod: ICheckoutPaymentMethods;
  tip: number | null;
  comment: string;
  wantAt: { date: ILabelValue; time: ILabelValue } | null;
  showDateTimeSelect: boolean;
}

const initialState: ICheckoutSliceState = {
  orderType: null,
  paymentMethod: 'CASH',
  tip: null,
  comment: '',
  wantAt: null,
  showDateTimeSelect: false,
};

export const CheckoutSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updatePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
    updateTip(state, action) {
      state.tip = action.payload;
    },
    updateOrderType(state, action) {
      state.orderType = action.payload;
    },
    updateComment(state, action) {
      state.comment = action.payload;
    },
    updateWantAt(state, action) {
      state.wantAt = action.payload;
    },
    updateShowDateTimeSelect(state, action) {
      state.showDateTimeSelect = action.payload;
    },
    updateClearCheckout(state) {
      state.orderType = null;
      state.paymentMethod = 'CASH';
      state.tip = null;
      state.comment = '';
    },
  },
  extraReducers: {
    [HYDRATE]: (state) => {
      return {
        ...state,
        // ...(action.payload)[SLICE_NAME],
      };
    },
  },
});

export const { updatePaymentMethod, updateTip, updateOrderType, updateComment, updateWantAt, updateClearCheckout, updateShowDateTimeSelect } =
  CheckoutSlice.actions;

export const selectPaymentMethod = (state: RootState) => state.checkout.paymentMethod;
export const selectTip = (state: RootState) => state.checkout.tip;
export const selectOrderType = (state: RootState) => state.checkout.orderType;
export const selectComment = (state: RootState) => state.checkout.comment;
export const selectWantAt = (state: RootState) => state.checkout.wantAt;
export const selectShowDateTimeSelect = (state: RootState) => state.checkout.showDateTimeSelect;
