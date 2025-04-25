import { Reducer } from '@/redux-fix';
import type { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type SliceReducer<T> = Reducer<T>;
