import throttle from "lodash/throttle";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { AddressesSlice } from "./slices/addresses.slices.redux";
import { ConfigurationSlice } from "./slices/configuration.slices.redux";
import { IndexSlice } from "./slices/index.slices.redux";
import { MenuSlice } from "./slices/menu.slices.redux";
import { UserSlice } from "./slices/user.slices.redux";
import { LS_BEARER_TOKEN } from "../constants/local-storage-keys.constants";

const store = configureStore({
  reducer: {
    menu: MenuSlice.reducer,
    user: UserSlice.reducer,
    index: IndexSlice.reducer,
    address: AddressesSlice.reducer,
    configuration: ConfigurationSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true
    })
  },
})

store.subscribe(throttle(() => {
  console.log('subscribe yayyyy')
  try {
    const state = store.getState()
    if (state.user.bearerToken) {
      localStorage.setItem(LS_BEARER_TOKEN, state.user.bearerToken)
    }
  } catch (error) {
    console.error(error)
  }
}, 1000))

const wrapper = createWrapper(() => store, { debug: false})

export default wrapper

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch