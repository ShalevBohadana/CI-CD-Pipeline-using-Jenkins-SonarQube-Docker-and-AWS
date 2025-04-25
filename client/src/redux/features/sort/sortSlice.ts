import { Reducer, Slice } from '@/redux-fix';
import { createSlice } from '@/redux-fix';
import { RootState } from '../../store';
// Define state type
interface SortState {
  // TODO: Add your state properties here
  // This is a placeholder to fix type errors
  [key: string]: any;
}

type sortState = {
  sort: {
    game: string;
    status: string;
  };
};

const initialState: sortState = {
  sort: {
    game: '',
    status: '',
  },
};

export const sortSlice: Slice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setActiveSort: (
      state,
      {
        payload,
      }: {
        payload: {
          game: string;
          status: string;
        };
      }
    ) => {
      state.sort = payload;
    },
  },
  extraReducers: () => {},
});
export const { setActiveSort } = sortSlice.actions;
export const sortReducer: Reducer<SortState> = sortSlice.reducer;
export const selectActiveSort = (state: RootState) => state.sort.sort;
