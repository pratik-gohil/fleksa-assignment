import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ILabelValue } from '../../utils/restaurant-timings.utils';
import { RootState } from '../store.redux';

const SLICE_NAME = 'checkout';

export type ICheckoutPaymentMethods = 'CASH' | 'STRIPE' | 'PAYPAL';
export type ICheckoutOrderTypes = 'PICKUP' | 'DELIVERY' | 'DINE_IN' | 'RESERVATION';

export interface IDeliveryFinances {
  amount: number | null; // min amout for delivery
  charges: number | null;
  free_from: number | null;
}

export interface ICheckoutSliceState {
  orderType: ICheckoutOrderTypes | null;
  paymentMethod: ICheckoutPaymentMethods;
  tip: number | null;
  comment: string;
  wantAt: { date: ILabelValue; time: ILabelValue } | null;
  showDateTimeSelect: boolean;
  selectedAddressId: number | null;
  deliveryFinances: IDeliveryFinances | null;
  promoCode: {
    code: string;
    value: number;
    token: string;
  } | null;
}

const initialState: ICheckoutSliceState = {
  orderType: null,
  paymentMethod: 'CASH',
  tip: null,
  comment: '',
  wantAt: null,
  showDateTimeSelect: false,
  selectedAddressId: null,
  deliveryFinances: null,
  promoCode: null,
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
    updateDeliveryFinances(state, action) {
      state.deliveryFinances = action.payload;
    },
    updateClearCheckout(state) {
      state.orderType = null;
      state.paymentMethod = 'CASH';
      state.tip = null;
      state.comment = '';
      state.wantAt = null;
      state.showDateTimeSelect = false;
      state.selectedAddressId = null;
      state.deliveryFinances = null;
      state.promoCode = null;
    },
    updateSelectedAddressId(state, action) {
      state.selectedAddressId = action.payload;
    },
    updatePromoCode(state, action) {
      state.promoCode = action.payload;
    },
    updateCheckout(state, action) {
      state = { ...state, ...action.payload };
    },
  },
  extraReducers: {
    [HYDRATE]: (state) => {
      return {
        ...state,
      };
    },
  },
});

export const {
  updatePaymentMethod,
  updateTip,
  updateOrderType,
  updateComment,
  updateWantAt,
  updateClearCheckout,
  updateShowDateTimeSelect,
  updateSelectedAddressId,
  updatePromoCode,
  updateDeliveryFinances,
  updateCheckout,
} = CheckoutSlice.actions;

export const selectDeliveryFinances = (state: RootState) => state.checkout.deliveryFinances;
export const selectPaymentMethod = (state: RootState) => state.checkout.paymentMethod;
export const selectTip = (state: RootState) => state.checkout.tip;
export const selectOrderType = (state: RootState) => state.checkout.orderType;
export const selectComment = (state: RootState) => state.checkout.comment;
export const selectWantAt = (state: RootState) => state.checkout.wantAt;
export const selectShowDateTimeSelect = (state: RootState) => state.checkout.showDateTimeSelect;
export const selectSelectedAddressId = (state: RootState) => state.checkout.selectedAddressId;
export const selectPromoCode = (state: RootState) => state.checkout.promoCode;
