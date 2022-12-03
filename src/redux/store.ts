import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from 'react-redux'
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";

import rootReducer, { RootState } from "./reducers";

export const store = configureStore({
  reducer: {
    rootReducer,
  }
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
