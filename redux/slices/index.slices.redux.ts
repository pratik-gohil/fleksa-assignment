import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IAddress } from '../../interfaces/common/address.common.interfaces';
import { IContent } from '../../interfaces/common/index.common.interfaces';
import { IOffer } from '../../interfaces/common/offer.common.interfaces';
import { IProduct } from '../../interfaces/common/product.common.interfaces';
import { IReview } from '../../interfaces/common/review.common.interfaces';
import { IShop, ITimings } from '../../interfaces/common/shop.common.interfaces';
import { ISibling } from '../../interfaces/common/sibling.common.interfaces';
import { RootState } from '../store.redux';

const SLICE_NAME = 'index';

export interface IIndexSliceState {
  address?: IAddress | null;
  images: Array<string>;
  products: Array<IProduct>;
  reviews: Array<IReview>;
  shop: IShop | null;
  timings: ITimings | null;
  siblings: Array<ISibling>;
  offers: Array<IOffer>;
  contents: Array<IContent>;
  banner?: {
    action: string;
    background: string;
    description: string;
    title: string;
  };
}

const initialState: IIndexSliceState = {
  address: null,
  images: [],
  products: [],
  reviews: [],
  shop: null,
  timings: null,
  siblings: [],
  offers: [],
  contents: [],
};

export const IndexSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateIndex: (state, action) => {
      state = action.payload;
      return state;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    updateShop: (state, action) => {
      state.shop = action.payload;
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    updateReviews: (state, action) => {
      state.reviews = action.payload;
    },
    updateImages: (state, action) => {
      state.images = action.payload;
    },
    updateTimings: (state, action) => {
      state.timings = action.payload;
    },
    updateSiblings: (state, action) => {
      state.siblings = action.payload;
    },
    updateOffers: (state, action) => {
      state.offers = action.payload;
    },
    updateContents: (state, action) => {
      state.contents = action.payload;
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
  updateAddress,
  updateShop,
  updateProducts,
  updateReviews,
  updateImages,
  updateTimings,
  updateSiblings,
  updateOffers,
  updateContents,
  updateIndex,
} = IndexSlice.actions;

export const selectAddress = (state: RootState) => state.index.address;
export const selectShop = (state: RootState) => state.index.shop;
export const selectProducts = (state: RootState) => state.index.products;
export const selectReviews = (state: RootState) => state.index.reviews;
export const selectImages = (state: RootState) => state.index.images;
export const selectTimings = (state: RootState) => state.index.timings;
export const selectSiblings = (state: RootState) => state.index.siblings;
export const selectOffers = (state: RootState) => state.index.offers;
export const selectContents = (state: RootState) => state.index.contents;
export const selectBanner = (state: RootState) => state.index.banner;
