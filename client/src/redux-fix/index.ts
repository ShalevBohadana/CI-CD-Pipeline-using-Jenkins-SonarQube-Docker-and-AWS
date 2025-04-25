// Redux fix wrapper to ensure proper bundling
import * as reduxOriginal from 'redux';
import * as reactReduxOriginal from 'react-redux';
import type {
  PayloadAction as RTPayloadAction,
  Slice as RTSlice,
  EntityState as RTEntityState,
  SliceCaseReducers,
  CreateSliceOptions,
  AsyncThunk,
} from '@reduxjs/toolkit';
import {
  configureStore as rtConfigureStore,
  createSlice as rtCreateSlice,
  createAsyncThunk as rtCreateAsyncThunk,
  createEntityAdapter as rtCreateEntityAdapter,
  createSelector as rtCreateSelector,
  createReducer as rtCreateReducer,
  createAction as rtCreateAction,
  combineReducers as rtCombineReducers,
} from '@reduxjs/toolkit';

// Re-export the original modules
export const redux = reduxOriginal;
export const reactRedux = reactReduxOriginal;

// Export types directly from RTK
export type PayloadAction<
  P = void,
  T extends string = string,
  M = never,
  E = never,
> = RTPayloadAction<P, T, M, E>;
export type EntityState<T, Id extends string | number = string> = RTEntityState<T, Id>;
export type Slice<
  State = any,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string,
> = RTSlice<State, CaseReducers, Name>;

// Common Redux types
export type Reducer<S> = reduxOriginal.Reducer<S>;
export type Store<
  S = any,
  A extends reduxOriginal.Action = reduxOriginal.AnyAction,
> = reduxOriginal.Store<S, A>;

// Re-export functions with explicit typing to avoid serialization errors
export const configureStore = rtConfigureStore;
export const createSlice = rtCreateSlice;
// Use 'any' to bypass the serialization limit for this complex type
// This maintains runtime functionality while avoiding TS errors
export const createAsyncThunk: any = rtCreateAsyncThunk;
export const createEntityAdapter = rtCreateEntityAdapter;
export const createSelector = rtCreateSelector;
export const createReducer = rtCreateReducer;
export const createAction = rtCreateAction;
export const toolkitCombineReducers = rtCombineReducers;
export const combineReducers = reduxOriginal.combineReducers;

// React-Redux hooks and components
export const useDispatch = reactReduxOriginal.useDispatch;
export const useSelector = reactReduxOriginal.useSelector;
export const Provider = reactReduxOriginal.Provider;
import type { Middleware } from 'redux';
export { Middleware };
