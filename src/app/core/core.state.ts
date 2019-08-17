import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AuthState } from './auth/auth.model';
import { authReducer } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  router: fromRouter.routerReducer,
};

export const selectRouterState = createFeatureSelector<
  AppState,
  fromRouter.RouterReducerState<RouterStateUrl>
  >('router');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const {url} = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
     state = state.firstChild;
    }
    const {params} = state;

    return {url, queryParams, params};
  }
}

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  auth: AuthState;
}
