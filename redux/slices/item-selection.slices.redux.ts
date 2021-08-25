import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ILanguageData } from '../../interfaces/common/language-data.common.interfaces';
import { RootState } from '../store.redux';

const SLICE_NAME = 'itemSelection';

export type IItemSelectionType = 'SINGLE' | 'PART';

// key is id of side product
// value is an object containing price of the side product
export interface IIndexSliceStateSideProducts
  extends Record<
    number,
    {
      price: number;
      name: ILanguageData;
    } | null
  > {}

// key is top_index
// value is an object containing product_index and price of choice
export interface IIndexSliceStateChoice
  extends Record<
    number,
    {
      product_index: number;
      price: number;
      name: ILanguageData;
    } | null
  > {}

export interface IIndexSliceState {
  cartId: string | null;
  productId: number | null;
  topProductId: number | null;
  type: IItemSelectionType | null;
  mainName: ILanguageData | null;
  partName: ILanguageData | null;
  sideProducts: IIndexSliceStateSideProducts;
  choice: IIndexSliceStateChoice;
  productPrice: number;
  totalCost: number;
}

const initialState: IIndexSliceState = {
  cartId: null,
  topProductId: null,
  productId: null,
  mainName: null,
  partName: null,
  type: null,
  sideProducts: {},
  choice: {},
  productPrice: 0,
  totalCost: 0,
};

function generateCartId({ productId, sideProducts, choice }: IIndexSliceState): string {
  const sideProdStr = Object.keys(sideProducts).join('-');
  const choiceStr = Object.keys(choice)
    .map((key) => `${key},${choice[Number(key)]?.product_index}`)
    .join('-');

  return `${productId}|${sideProdStr}|${choiceStr}`;
}

export function calculateTotalCost(
  productCost: number,
  sideProducts: IIndexSliceStateSideProducts,
  choice: IIndexSliceStateChoice,
): number {
  let sideProdCost = 0;
  let choiceCost = 0;

  Object.keys(sideProducts).map((key) => {
    const price = sideProducts && sideProducts[Number(key)]?.price;
    if (price) sideProdCost += price;
  });

  Object.keys(choice).map((key) => {
    const price = choice && choice[Number(key)]?.price;
    if (price) choiceCost += price;
  });

  return productCost + sideProdCost + choiceCost;
}

export const ItemSelectionSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateItemSelectionNewItem(state, action) {
      state.productId = action.payload.productId;
      state.type = action.payload.type;
      state.topProductId = action.payload.topProductId;
      state.mainName = action.payload.mainName;
      state.partName = action.payload.partName;
      state.sideProducts = {};
      state.choice = {};
      state.cartId = state.productId ? generateCartId(state) : null;
      state.productPrice = action.payload.cost;
      state.totalCost = calculateTotalCost(state.productPrice, state.sideProducts, state.choice);
    },
    updateItemSelectionAddSideProduct(state, action) {
      state.sideProducts[action.payload.id] = action.payload.data;
      state.cartId = state.productId ? generateCartId(state) : null;
      state.totalCost = calculateTotalCost(state.productPrice, state.sideProducts, state.choice);
    },
    updateItemSelectionRemoveSideProduct(state, action) {
      delete state.sideProducts[action.payload];
      state.cartId = state.productId ? generateCartId(state) : null;
      state.totalCost = calculateTotalCost(state.productPrice, state.sideProducts, state.choice);
    },
    updateItemSelectionChoice(state, action) {
      state.choice[action.payload.id] = action.payload.data;
      state.cartId = state.productId ? generateCartId(state) : null;
      state.totalCost = calculateTotalCost(state.productPrice, state.sideProducts, state.choice);
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
  updateItemSelectionNewItem,
  updateItemSelectionAddSideProduct,
  updateItemSelectionRemoveSideProduct,
  updateItemSelectionChoice,
} = ItemSelectionSlice.actions;

export const selectItemSelectionProduct = (state: RootState) => state.itemSelection.productId;
export const selectItemSelectionCartId = (state: RootState) => state.itemSelection.cartId;
export const selectItemSelectionByTopProductId = (state: RootState, topProductId: number) => {
  return state.itemSelection.topProductId === topProductId ? state.itemSelection : null;
};
export const selectItemSelectionSideProduct = (state: RootState, productId: number) => {
  return state.itemSelection.productId === productId ? state.itemSelection.sideProducts : null;
};
export const selectItemSelectionChoice = (state: RootState, productId: number) => {
  return state.itemSelection.productId === productId ? state.itemSelection.choice : null;
};
