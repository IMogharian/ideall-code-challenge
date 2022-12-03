import { combineReducers } from "redux";

import tickers from './slices/tickers';

import { store } from "./store";

const rootReducer = combineReducers({ tickers });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
