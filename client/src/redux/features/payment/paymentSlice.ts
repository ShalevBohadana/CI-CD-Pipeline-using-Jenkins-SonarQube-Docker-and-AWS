import { Reducer, Slice } from '@/redux-fix';
import { createSlice } from '@/redux-fix';
// Define state type
interface PaymentState {
  // TODO: Add your state properties here
  // This is a placeholder to fix type errors
  [key: string]: any;
}

type Payment = {
  isOpen: boolean;
};

const initialState: Payment = {
  isOpen: false,
};

export const paymentSlice: Slice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
});
// export const {} = paymentSlice.actions;
export const paymentReducer: Reducer<PaymentState> = paymentSlice.reducer;
// export const selectCartItems = (state: RootState) => state.cart.items;
// export const selectCartItemsCount = (state: RootState) =>
//   state.cart.items.length;
// export const selectCartItemsTotal = (state: RootState) => state.cart.itemsTotal;
