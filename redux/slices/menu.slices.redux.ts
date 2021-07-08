import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { ICategory } from '../../interfaces/common/category.common.interfaces'
import { IMenuPart } from '../../interfaces/common/menu-part.common.interfaces'
import { IMenuSide } from '../../interfaces/common/menu-side.common.interfaces'
import { RootState } from '../store.redux'

const SLICE_NAME = "menu"

export interface IMenuSliceState {
  categories: Array<ICategory>
  sides: Record<number, IMenuSide>
  parts: Record<number, IMenuPart>
  searchQuery: string
  showAddAddress: boolean
  showOrderTypeSelect: boolean
}

const initialState: IMenuSliceState = {
  categories: [],
  sides: {},
  parts: {},
  searchQuery: "",
  showAddAddress: false,
  showOrderTypeSelect: false,
}

export const MenuSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateCategories(state, action) {
      state.categories = (action.payload as Array<ICategory>).map(category => {
        const products = category.products.map(product => {
          return {
            ...product,
            _metaSeachText: {
              english: `${product.name_json.english} ${product.description_json.english}`.toLowerCase(),
              german: `${product.name_json.german} ${product.description_json.german}`.toLowerCase()
            },
            _metaIsVisible: true,
          }
        })
        return {
          ...category,
          products
        }
      })
    },
    updateSides(state, action) {
      state.sides = action.payload
    },
    updateParts(state, action) {
      state.parts = action.payload
    },
    updateSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    updateShowAddAddress(state, action) {
      state.showAddAddress = action.payload
    },
    updateShowOrderTypeSelect(state, action) {
      state.showOrderTypeSelect = action.payload
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
  updateSearchQuery,
  updateShowAddAddress,
  updateShowOrderTypeSelect
} = MenuSlice.actions

export const selectCategoriesSearch = (state: RootState, searchQuery: string) => {
  if (searchQuery.length === 0) {
    return state.menu.categories
  } else {
    return state.menu.categories.map(category => {
      const products = category.products.filter(product => {
        return product._metaSeachText[state.configuration.language].includes(searchQuery)
      })
      return {
        ...category,
        products
      }
    })
  }
}

export const selectCategoryNames = (state: RootState) => state.menu.categories.map(category => {
  return {
    name_json: category.name_json
  }
})

export const selectParts = (state: RootState, idList: Array<number>) => {
  const data: Record<number, IMenuPart> = {}
  idList.map(i => {
    data[i] = state.menu.parts[i]
  })
  return data
}
export const selectSide = (state: RootState, id: number) => state.menu.sides[id]
export const selectSidesArray = (state: RootState, idList: Array<number>) => idList.map(i => state.menu.sides[i]).filter(i => i)
export const selectSearchQuery = (state: RootState) => state.menu.searchQuery
export const selectShowAddress = (state: RootState) => state.menu.showAddAddress
export const selectShowOrderTypeSelect = (state: RootState) => state.menu.showOrderTypeSelect