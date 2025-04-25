import { Reducer } from '@/redux-fix';
import { RootState } from '@/redux/store';
import type { PayloadAction, Slice } from '@reduxjs/toolkit';
import { createSlice } from '@/redux-fix';
// Define state type
interface ProductState {
  // TODO: Add your state properties here
  // This is a placeholder to fix type errors
  [key: string]: any;
}

// Define the state interface
export interface IProductSlice {
  status: boolean;
  priceRange: number;
}

// Define initial state
const initialState: IProductSlice = {
  status: false,
  priceRange: 150,
};

// Create slice with explicit typing
export const productSlice: Slice<IProductSlice> = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleStatus: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

// Export actions and reducer
export const { toggleStatus, setPriceRange } = productSlice.actions;
export const productReducer: Reducer<ProductState> = productSlice.reducer;

// Type-safe selectors with explicit state type
export const selectProductStatus = (state: RootState): boolean => {
  const productState = state.product as IProductSlice;
  return productState.status;
};

export const selectPriceRange = (state: RootState): number => {
  const productState = state.product as IProductSlice;
  return productState.priceRange;
};

// Optional: Type guard to ensure type safety
const isProductState = (state: unknown): state is IProductSlice => {
  const product = state as IProductSlice;
  return (
    product !== undefined &&
    typeof product.status === 'boolean' &&
    typeof product.priceRange === 'number'
  );
};

// More type-safe selectors using type guard
export const selectProductStateWithGuard = (state: RootState) => {
  if (!isProductState(state.product)) {
    throw new Error('Invalid product state');
  }
  return state.product;
};
