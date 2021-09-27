import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IAddress } from '../../interfaces/common/address.common.interfaces';
import { IBanner, IContent } from '../../interfaces/common/index.common.interfaces';
import { IOffer } from '../../interfaces/common/offer.common.interfaces';
import { IProduct } from '../../interfaces/common/product.common.interfaces';
import { IReview } from '../../interfaces/common/review.common.interfaces';
import { IShop, ITimings } from '../../interfaces/common/shop.common.interfaces';
import { ISibling } from '../../interfaces/common/sibling.common.interfaces';
import { RootState } from '../store.redux';
import { ICheckoutOrderTypes } from './checkout.slices.redux';

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
  banner?: IBanner;
  owner: {
    name: string;
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
  owner: {
    name: '',
  },
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

// ?? Data selection reducers functions
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
export const selectOwner = (state: RootState) => state.index.owner;

export const selectAvailableOrderType = (state: RootState) => {
  const availableOrderTypes = [
    {
      type: 'PICKUP',
      isAvailable: state.index.address?.has_pickup,
    },
    {
      type: 'DELIVERY',
      isAvailable: state.index.address?.has_delivery,
    },
    {
      type: 'DINE_IN',
      isAvailable: state.index.address?.has_dinein,
    },
  ].filter((selection) => selection.isAvailable);

  return {
    count: availableOrderTypes.length,
    types: availableOrderTypes.map((available) => available.type),
  };
};

export const checkIsSelectedOrderTypeAvailable = (state: RootState, type: ICheckoutOrderTypes | null) => {
  if (!type) return false;

  if (
    (type === 'PICKUP' && state.index.address?.has_pickup) ||
    (type === 'DELIVERY' && state.index.address?.has_delivery) ||
    (type === 'DINE_IN' && state.index.address?.has_dinein)
  )
    return true;

  return false;
};
