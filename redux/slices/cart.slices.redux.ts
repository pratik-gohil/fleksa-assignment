import { createSlice } from '@reduxjs/toolkit';
import { ILanguageData } from '../../interfaces/common/language-data.common.interfaces';
import { IType } from '../../interfaces/common/types.common.interfaces';
import { RootState } from '../store.redux';

const SLICE_NAME = 'cart';

export interface ICartItem {
  topProductId: number;
  id: number;
  cartId: string;
  quantity: number;
  mainName: ILanguageData;
  partName: ILanguageData;
  type: IType;
  sideProducts: Array<{ id: number; name: ILanguageData }> | null;
  choice: Array<{ top_index: number; product_index: number; name: ILanguageData }> | [];
  costOneItem: number;
  totalCost: number;
  isAvailable: boolean;
}

export interface ICartSliceState {
  items: Record<string, ICartItem>;
  cartCost: number;
}

const initialState: ICartSliceState = {
  items: {},
  cartCost: 0,
};

export const CartSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateAddProduct(state, action) {
      // TODO: Product increment if already exist
      if (state.items[action.payload.cartId]) {
        ++state.items[action.payload.cartId].quantity;
        state.items[action.payload.cartId].totalCost += state.items[action.payload.cartId].costOneItem;
        state.cartCost += state.items[action.payload.cartId].costOneItem;
      }
      // TODO: Add new product into the cart
      else {
        const sideProducts = action.payload.sideProducts
          ? Object.keys(action.payload.sideProducts).map((key) => {
              return { id: Number(key), name: action.payload.sideProducts[key].name };
            })
          : null;

        const choice = action.payload.choice
          ? Object.keys(action.payload.choice).map((key) => {
              return {
                top_index: Number(key),
                product_index: action.payload.choice[key].product_index,
                name: action.payload.choice[key].name,
              };
            })
          : null;

        state.items[action.payload.cartId] = {
          topProductId: action.payload.topProductId,
          id: action.payload.productId,
          cartId: action.payload.cartId,
          quantity: 1,
          sideProducts: sideProducts,
          choice: choice ?? [],
          mainName: action.payload.mainName,
          partName: action.payload.partName,
          type: action.payload.type,
          costOneItem: action.payload.totalCost,
          totalCost: action.payload.totalCost,
          isAvailable: action.payload.isAvailable,
        };

        state.cartCost += action.payload.totalCost;
      }
    },
    updateBulkProduct(state, action) {
      state.items = action.payload;

      state.cartCost = Object.values(action.payload as Record<string, ICartItem>)
        .map((item) => {
          if (item.isAvailable) return item.totalCost;

          return 0;
        })
        .reduce((a: number, b: number) => a + b, 0);
    },
    updateReduceProduct(state, action) {
      if (state.items[action.payload.cartId]?.quantity > 1) {
        --state.items[action.payload.cartId].quantity;
        state.items[action.payload.cartId].totalCost -= state.items[action.payload.cartId].costOneItem;
        state.cartCost -= state.items[action.payload.cartId].costOneItem;
      } else {
        state.cartCost -= state.items[action.payload.cartId].costOneItem;
        delete state.items[action.payload.cartId];
      }
    },
    updateClearCart(state) {
      state.items = {};
      state.cartCost = 0;
    },
  },
});

export const { updateAddProduct, updateReduceProduct, updateClearCart, updateBulkProduct } = CartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemByCartId = (state: RootState, cartId: string | null) => (cartId ? state.cart.items[cartId] : null);
