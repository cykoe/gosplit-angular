import { createReducer, on } from '@ngrx/store';
import { decrement, increment, reset } from './actions';

export const initState = 0;

export const counterReducer = createReducer(initState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0),
);
