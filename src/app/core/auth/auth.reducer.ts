import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthState } from './auth.model';

export const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

const reducer = createReducer(
  initialState,
  on(AuthActions.authLogin, (state) => ({ ...state, isLoading: true })),
  on(AuthActions.authLoginSuccess, (state) => ({ ...state, isLoading: false, error: null, isAuthenticated: true })),
  on(AuthActions.authLoginFail, (state, {error}) => {
    console.log({error});
    return ({ ...state, error });
  }),
  on(AuthActions.authLogout, (state) => ({ ...state, isLoading: true })),
  on(AuthActions.authLogoutSuccess, (state) => ({ ...state, isLoading: false, error: null, isAuthenticated: false })),
);

export function authReducer(
  state: AuthState | undefined,
  action: Action,
): AuthState {
  return reducer(state, action);
}
