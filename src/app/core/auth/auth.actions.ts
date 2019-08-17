import { createAction, props } from '@ngrx/store';
import { ICredential } from './auth.model';

export const authLogin = createAction('[Auth] Login', props<{credential: ICredential}>());
export const authLoginSuccess = createAction('[Auth] Login Success');
export const authLoginFail = createAction('[Auth] Login Fail', props<{error: any}>());
export const authLogout = createAction('[Auth] Logout');
export const authLogoutSuccess = createAction('[Auth] Logout Success');
