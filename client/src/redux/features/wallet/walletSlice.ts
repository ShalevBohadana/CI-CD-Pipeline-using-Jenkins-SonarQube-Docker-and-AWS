import { Reducer, Slice } from '@/redux-fix';
import { createSlice } from '@/redux-fix';
// Define state type
interface WalletState {
  // TODO: Add your state properties here
  // This is a placeholder to fix type errors
  [key: string]: any;
}

type Wallet = {
  balance: number;
};

const initialState: Wallet = {
  balance: 0,
};

export const walletSlice: Slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
});

// export const {} = walletSlice.actions;
export const walletReducer: Reducer<WalletState> = walletSlice.reducer;
