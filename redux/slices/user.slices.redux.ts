import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { ICustomer } from '../../interfaces/common/customer.common.interfaces'
import { RootState } from '../store.redux'

const SLICE_NAME = "user"

export interface IUserSliceState {
  bearerToken: string|null
  customer: ICustomer
}

const initialState: IUserSliceState = {
  bearerToken: null,
  customer: {
    name: '',
    email: null,
    country_code: '',
    phone: '',
    email_verified: null,
    phone_verified: null
  }
}

export const UserSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateBearerToken(state, action) {
      state.bearerToken = action.payload
    },
    updateCustomer(state, action) {
      state.customer = action.payload
    },
    updateCustomerName(state, action) {
      state.customer.name = action.payload
    },
    updateCustomerEmail(state, action) {
      state.customer.email = action.payload
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
  updateBearerToken,
  updateCustomer,
  updateCustomerName,
  updateCustomerEmail
} = UserSlice.actions

export const selectIsUserLoggedIn = (state: RootState) => state.user.bearerToken !== null
export const selectBearerToken = (state: RootState) => state.user.bearerToken
export const selectCustomer = (state: RootState) => state.user.customer