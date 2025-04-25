import { Reducer } from '@/redux-fix';
import { createSlice, PayloadAction, Slice } from '@/redux-fix';
import { OfferDataDb } from '../../../pages/CreateOffer';
import { DynamicFilterInputs } from '../../../pages/CreateOffer/Main';
import { getComputedPrice } from '../../../pages/OffersSingle/Main';
import { RootState } from '../../store';
// Define state type
interface CurrentOfferState {
  // TODO: Add your state properties here
  // This is a placeholder to fix type errors
  [key: string]: any;
}

export type SelectedFiltersForCart = {
  name: string;
  value: string[];
};

export type UserSelectedOffer = {
  price: number;
  region: string;
  filters: SelectedFiltersForCart[];
  isDiscountApplied: boolean;
};

export type CurrentOffer = {
  offer: OfferDataDb | undefined;
  hasRegionFilter: boolean;
  regionFilter?: DynamicFilterInputs;
  dynamicFilters: DynamicFilterInputs[];
  selected: UserSelectedOffer;
};

const initialState: CurrentOffer = {
  offer: undefined,
  hasRegionFilter: false,
  regionFilter: undefined,
  dynamicFilters: [],
  selected: {
    region: '',
    price: 0,
    filters: [],
    isDiscountApplied: false,
  },
};

const getCalculatedFilterPrice = (state: CurrentOffer) => {
  let totalFilterPrice = 0;

  state.selected.filters.forEach(({ name, value }) => {
    const filterGroup = state.dynamicFilters.find((item) => item.name?.toLowerCase() === name);

    if (filterGroup) {
      value.forEach((filterName) => {
        const filter = filterGroup.children!.find(
          (child) => child.name.toLowerCase() === filterName
        );

        if (filter && filter.children) {
          const regionPrice = filter.children.find(
            (region) => region.name.toLowerCase() === state.selected.region
          );

          if (regionPrice) {
            totalFilterPrice += regionPrice.fee;
          }
        }
      });
    }
  });

  return totalFilterPrice;
};

export const currentOfferSlice: Slice = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {
    setCurrentOffer: (state, action: PayloadAction<OfferDataDb | undefined>) => {
      state.offer = action.payload;
      const defaultRegion =
        action.payload?.dynamicFilters?.[0]?.children?.[0]?.name?.toLowerCase() || '';

      state.selected.region = defaultRegion;
      state.selected.isDiscountApplied = !!action.payload?.discount;

      state.selected.price = getComputedPrice(state.offer!.basePrice, state.offer?.discount);

      const REGION_FILTER = action.payload!.dynamicFilters.find(
        (item) => item?.name?.toLowerCase() === 'region'
      );

      const OTHER_DYNAMIC_FILTERS = action.payload!.dynamicFilters.filter(
        (item) => item?.name?.toLowerCase() !== 'region'
      );
      state.regionFilter = REGION_FILTER;
      state.hasRegionFilter = !!REGION_FILTER;
      state.dynamicFilters = OTHER_DYNAMIC_FILTERS;
    },

    setCurrentOfferRegion: (state, action: PayloadAction<string>) => {
      state.selected.region = action.payload;

      const totalFilterPrice = getCalculatedFilterPrice(state);

      state.selected.price =
        getComputedPrice(state.offer!.basePrice, state.offer?.discount) + totalFilterPrice;
    },
    toggleFilter: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const existingFilter = state.selected.filters.find(
        (filter) => filter.name === action.payload.name
      );

      if (!existingFilter) {
        state.selected.filters.push({
          name: action.payload.name,
          value: [action.payload.value],
        });
      } else {
        const uniqueValueSet = new Set(existingFilter.value);
        const currentValue = action.payload.value;
        if (uniqueValueSet.has(currentValue)) {
          uniqueValueSet.delete(currentValue);
        } else {
          uniqueValueSet.add(currentValue);
        }
        existingFilter.value = Array.from(uniqueValueSet);
      }

      const totalFilterPrice = getCalculatedFilterPrice(state);

      state.selected.price =
        getComputedPrice(state.offer!.basePrice, state.offer?.discount) + totalFilterPrice;
    },
  },
});

export const { setCurrentOffer, toggleFilter, setCurrentOfferRegion } = currentOfferSlice.actions;

export const currentOfferReducer: Reducer<CurrentOfferState> = currentOfferSlice.reducer;

export const selectSelectedRegion = (state: RootState) => state.currentOffer.selected.region;
export const selectSelectedFilters = (state: RootState) => state.currentOffer.selected.filters;
export const selectSelectedOfferPrice = (state: RootState) => state.currentOffer.selected.price;
export const selectRegionFilter = (state: RootState) => state.currentOffer.regionFilter;
export const selectDynamicFilters = (state: RootState) => state.currentOffer.dynamicFilters;
export const selectCurrentOfferState = (state: RootState) => state.currentOffer;
