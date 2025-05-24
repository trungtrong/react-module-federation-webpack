/**
 * Documentation: https://redux.js.org/usage/nextjs
 * injectReducer: https://redux.js.org/usage/code-splitting
 */

import type { Action, AnyAction, Reducer, Store, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { AsyncReducers, RootState } from "./rootReducer";

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.

interface CustomStore extends Store<RootState, AnyAction> {
  asyncReducers?: AsyncReducers;
}
const store: CustomStore = configureStore({
  reducer: rootReducer() as Reducer,
  devTools: process.env?.NODE_ENV === 'local',
});

store.asyncReducers = {};

export function injectReducer<S>(key: string, reducer: Reducer<S, Action>) {
  if (store.asyncReducers) {
      if (store.asyncReducers[key]) {
          return;
      }
      store.asyncReducers[key] = reducer;
      store.replaceReducer(rootReducer(store.asyncReducers) as Reducer)
  }
  return store;
}
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export default store;
