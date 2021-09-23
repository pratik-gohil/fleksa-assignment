import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AddressTypes } from '../../components/templateOne/common/addresses/address-manager.common.templateOne.components';
import { ICustomer } from '../../interfaces/common/customer.common.interfaces';
import { RootState } from '../store.redux';

const SLICE_NAME = 'user';

export interface IUserSliceState {
  bearerToken: string | null;
  customer: ICustomer;
}

const initialState: IUserSliceState = {
  bearerToken: null,
  customer: {
    name: '',
    email: '',
    country_code: '49',
    phone: '',
    email_verified: 0,
    phone_verified: 0,
    all_address: [],
    orders: [],
  },
};

export const UserSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateBearerToken(state, action) {
      state.bearerToken = action.payload;
    },
    updateCustomer(state, action) {
      state.customer = action.payload;
    },
    updateCustomerName(state, action) {
      state.customer.name = action.payload;
    },
    updateCustomerPhone(state, action) {
      state.customer.phone = action.payload;
    },
    updateCustomerCountryCode(state, action) {
      state.customer.country_code = action.payload;
    },
    updateCustomerEmail(state, action) {
      state.customer.email = action.payload;
    },
    updateCustomerEmailVerification(state, action) {
      state.customer.email_verified = action.payload;
    },
    updateLoadAddressesList(state, action) {
      state.customer.all_address = action.payload;
    },
    updateCustomerOrderHistory(state, action) {
      state.customer.orders = action.payload;
    },
    updateNewCustomerAddress(state, action) {
      state.customer.all_address?.push(action.payload);
    },
    updateExistCustomerAddress(state, action) {
      const index = state.customer.all_address?.findIndex((address) => action.payload.id === address.id);

      if (index !== -1) {
        state.customer.all_address[index] = action.payload;
      }
    },
    updateExistCustomerAddressOrAddNew(state, action) {
      const index = state.customer.all_address?.findIndex((address) => action.payload.id === address.id);

      if (index !== -1) {
        state.customer.all_address[index] = action.payload;
      } else {
        state.customer.all_address?.push(action.payload);
      }
    },
    deleteCustomerAddress(state, action) {
      state.customer.all_address = state.customer.all_address.filter((address) => address.id !== action.payload);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload[SLICE_NAME],
      };
    },
  },
});

export const {
  updateBearerToken,
  updateCustomer,
  updateCustomerName,
  updateCustomerEmail,
  updateLoadAddressesList,
  updateNewCustomerAddress,
  updateExistCustomerAddress,
  updateExistCustomerAddressOrAddNew,
  deleteCustomerAddress,
  updateCustomerEmailVerification,
  updateCustomerPhone,
  updateCustomerCountryCode,
  updateCustomerOrderHistory,
} = UserSlice.actions;

export const selectIsUserLoggedIn = (state: RootState) => !!state.user.bearerToken;
export const selectBearerToken = (state: RootState) => state.user.bearerToken;
export const selectCustomer = (state: RootState) => state.user.customer;
export const selectCustomerOrderHistory = (state: RootState) => state.user.customer.orders;
export const selectAddressByType = (state: RootState, addressType: AddressTypes) =>
  state.user.customer.all_address?.find((i) => i.address_type === addressType);
export const selectAddressById = (state: RootState, id: number | null) =>
  id ? state.user.customer.all_address?.find((i) => i.id === id) : undefined;
