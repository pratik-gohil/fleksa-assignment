import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IAddress } from "../../interfaces/common/address.common.interfaces";
import { IProduct } from "../../interfaces/common/product.common.interfaces";
import { IReview } from "../../interfaces/common/review.common.interfaces";
import { IShop } from "../../interfaces/common/shop.common.interfaces";
import { RootState } from "../store.redux";

const SLICE_NAME = "index"

export interface IIndexSliceState {
  address?: IAddress|null
  images: Array<string>
  products: Array<IProduct>
  reviews: Array<IReview>
  shop: IShop|null
}

const initialState: IIndexSliceState = {
  address: null,
  images: [],
  products: [],
  reviews: [],
  shop: null
}

export const IndexSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      state.address = action.payload
    },
    updateShop: (state, action) => {
      state.shop = action.payload
    },
    updateProducts: (state, action) => {
      state.products = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...(action.payload)[SLICE_NAME]
      }
    }
  }
})

export const { updateAddress, updateShop, updateProducts } = IndexSlice.actions

export const selectAddress = (state: RootState) => state.index.address
export const selectShop = (state: RootState) => state.index.shop
export const selectProducts = (state: RootState) => state.index.products