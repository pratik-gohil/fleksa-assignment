import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { AddressesSlice } from "./slices/addresses.slices.redux";
import { ConfigurationSlice } from "./slices/configuration.slices.redux";
import { IndexSlice } from "./slices/index.slices.redux";
import { MenuSlice } from "./slices/menu.slices.redux";
import { ItemSelectionSlice } from "./slices/item-selection.slices.redux";
import { UserSlice } from "./slices/user.slices.redux";
import { CartSlice, ICartSliceState } from "./slices/cart.slices.redux";
import { LS_CART } from "../constants/keys-local-storage.constants";
import { CheckoutSlice } from "./slices/checkout.slices.redux";

const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    menu: MenuSlice.reducer,
    user: UserSlice.reducer,
    index: IndexSlice.reducer,
    checkout: CheckoutSlice.reducer,
    address: AddressesSlice.reducer,
    configuration: ConfigurationSlice.reducer,
    itemSelection: ItemSelectionSlice.reducer,
  },
  preloadedState: {
    cart: typeof window !== "undefined"? (
      JSON.parse(localStorage.getItem(LS_CART) || `{
        "items": {},
        "cartCost": 0
      }`) as ICartSliceState
    ): ({
      items: {},
      cartCost: 0
    })
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true
    })
  },
})

store.subscribe(() => {
  if (typeof window !== "undefined") {
    try {
      const state = store.getState()
      localStorage.setItem(LS_CART, JSON.stringify(state.cart))
    } catch (error) {
      console.error(error)
    }
  }
})

const wrapper = createWrapper(() => store, { debug: false})

export default wrapper

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch