import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { ILanguageData } from '../../interfaces/common/language-data.common.interfaces'
import { IType } from '../../interfaces/common/types.common.interfaces'
import { RootState } from '../store.redux'

const SLICE_NAME = "cart"

export interface ICartItem {
  id: number
  quantity: number
  mainName: ILanguageData
  partName: ILanguageData
  type: IType
  sideProducts: Array<{ id: number; name: string }> | null
  choice: Array<{ top_index: number; product_index: number; name: string }> | null
}

export interface ICartSliceState {
  items: Record<string, ICartItem>
}

const initialState: ICartSliceState = {
  items: {}
}

export const CartSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateAddProduct(state, action) {
      if (state.items[action.payload.cartId]) {
        ++state.items[action.payload.cartId].quantity
      } else {
        const sideProducts = action.payload.sideProducts? Object.keys(action.payload.sideProducts).map(key => {
          return { id: Number(key), name: action.payload.sideProducts[key].name }
        }): null
        const choice = action.payload.choice? Object.keys(action.payload.choice).map(key => {
          return {
            top_index: Number(key),
            product_index: action.payload.choice[key].product_index,
            name: action.payload.choice[key].name
          }
        }): null
        state.items[action.payload.cartId] = {
          id: action.payload.productId,
          quantity: 1,
          sideProducts: sideProducts,
          choice,
          mainName: action.payload.mainName,
          partName: action.payload.partName,
          type: action.payload.type
        }
      }
    },
    updateReduceProduct(state, action) {
      if (state.items[action.payload.cartId]?.quantity > 1) {
        --state.items[action.payload.cartId].quantity
      } else {
        delete state.items[action.payload.cartId]
      }
    }
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
  updateAddProduct,
  updateReduceProduct,
} = CartSlice.actions

export const selectCart = (state: RootState) => state.cart
export const selectCartItemByCartId = (state: RootState, cartId: string|null) => cartId? state.cart.items[cartId]: null