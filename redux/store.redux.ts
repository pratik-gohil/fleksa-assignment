import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { AddressesSlice } from "./slices/addresses.slices.redux";
import { ConfigurationSlice } from "./slices/configuration.slices.redux";
import { IndexSlice } from "./slices/index.slices.redux";

const store = configureStore({
  reducer: {
    index: IndexSlice.reducer,
    address: AddressesSlice.reducer,
    configuration: ConfigurationSlice.reducer,
  },
  preloadedState: {

  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true
    })
  },
})

const wrapper = createWrapper(() => store, { debug: false})

export default wrapper

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch