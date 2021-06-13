import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { ICategory } from '../../interfaces/common/category.common.interfaces'
import { IMenuPart } from '../../interfaces/common/menu-part.common.interfaces'
import { IMenuSide } from '../../interfaces/common/menu-side.common.interfaces'
import { RootState } from '../store.redux'

const SLICE_NAME = "menu"

export interface IMenuSliceState {
  categories: Array<ICategory>
  sides: Record<number, IMenuSide>,
  parts: Record<number, IMenuPart>
}

const initialState: IMenuSliceState = {
  categories: [],
  sides: {},
  parts: {}
}

export const MenuSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateCategories(state, action) {
      state.categories = action.payload
    },
    updateSides(state, action) {
      state.sides = action.payload
    },
    updateParts(state, action) {
      state.parts = action.payload
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
  updateCategories,
  updateParts,
  updateSides,
} = MenuSlice.actions

export const selectCategories = (state: RootState) => state.menu.categories
export const selectParts = (state: RootState, idList: Array<number>) => {
  const data: Record<number, IMenuPart> = {}
  idList.map(i => {
    data[i] = state.menu.parts[i]
  })
  return data
}
export const selectSides = (state: RootState) => state.menu.sides
