import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { ConfigurationSlice } from './slices/configuration.slices.redux';
import { IndexSlice } from './slices/index.slices.redux';
import { MenuSlice } from './slices/menu.slices.redux';
import { ItemSelectionSlice } from './slices/item-selection.slices.redux';
import { userInitialState, UserSlice } from './slices/user.slices.redux';
import { CartSlice } from './slices/cart.slices.redux';
import { LS_CART, LS_CHECKOUT, LS_CUSTOMER_INFO } from '../constants/keys-local-storage.constants';
import { checkoutInitialState, CheckoutSlice } from './slices/checkout.slices.redux';
import { CommonSlice } from './slices/common.slices.redux';

const makeStore = () =>
  configureStore({
    reducer: {
      cart: CartSlice.reducer,
      menu: MenuSlice.reducer,
      user: UserSlice.reducer,
      index: IndexSlice.reducer,
      checkout: CheckoutSlice.reducer,
      configuration: ConfigurationSlice.reducer,
      itemSelection: ItemSelectionSlice.reducer,
      common: CommonSlice.reducer,
    },
    preloadedState: {
      cart:
        typeof window !== 'undefined' && localStorage.getItem(LS_CART)
          ? JSON.parse(localStorage.getItem(LS_CART) as string)
          : {
              items: {},
              cartCost: 0,
            },

      checkout:
        typeof window !== 'undefined' && localStorage.getItem(LS_CHECKOUT)
          ? JSON.parse(localStorage.getItem(LS_CHECKOUT) as string)
          : checkoutInitialState,

      user:
        typeof window !== 'undefined' && localStorage.getItem(LS_CUSTOMER_INFO)
          ? JSON.parse(localStorage.getItem(LS_CUSTOMER_INFO) as string)
          : userInitialState,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      });
    },
  });

const wrapper = createWrapper(
  () => {
    const store = makeStore();

    store.subscribe(() => {
      if (typeof window !== 'undefined') {
        try {
          const state = store.getState();
          localStorage.setItem(LS_CART, JSON.stringify(state.cart));
          localStorage.setItem(LS_CHECKOUT, JSON.stringify(state.checkout));
          localStorage.setItem(LS_CUSTOMER_INFO, JSON.stringify({ ...userInitialState, customer: state.user.customer }));
        } catch (error) {
          console.error(error);
        }
      }
    });

    return store;
  },
  { debug: false },
);

export default wrapper;

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
