import type { PayloadAction } from '@reduxjs/toolkit';
import { Reducer, Slice } from '@/redux-fix';
import { createSlice } from '@/redux-fix';
import { CURRENCY_VALUE, CurrencyValue } from '../../../components/ui/SelectCurrencyDropdown';
// Define state type
interface CurrencyState {
  // TODO: Add your state properties here
  // This is a placeholder to fix type errors
  [key: string]: any;
}

type CurrencySlice = {
  isLoading: boolean;
  isError: boolean;
  error?: string;
  currency: CurrencyValue;
  rate: number;
};
export const currencyInitialState: CurrencySlice = {
  isLoading: false,
  isError: false,
  currency: CURRENCY_VALUE.USD,
  rate: 1,
} as const;

export const currencySlice: Slice = createSlice({
  name: 'currency',
  initialState: currencyInitialState,
  reducers: {
    setCurrencyValue: (state, action: PayloadAction<CurrencyValue>) => {
      state.currency = action.payload;
    },
    setCurrencyRate: (state, action: PayloadAction<number>) => {
      state.rate = action.payload;
    },
    resetToDefaultCurrency: (state) => {
      state.currency = currencyInitialState.currency;
      state.rate = currencyInitialState.rate;
    },
  },
  extraReducers: () => {},
});
export const { setCurrencyValue, setCurrencyRate, resetToDefaultCurrency } = currencySlice.actions;
export const currencyReducer: Reducer<CurrencyState> = currencySlice.reducer;
