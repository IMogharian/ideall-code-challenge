import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITickers {
  tickers: {[key: string]: Ticker};
}

const initialState: ITickers = {
  tickers: {},
};

const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    setMarketData: (state, action: PayloadAction<{[key: string]: Ticker}>) => {
      state.tickers = {...state.tickers, ...action.payload}
    }, 
  },
});

export const { setMarketData } = tickersSlice.actions;

export default tickersSlice.reducer;
