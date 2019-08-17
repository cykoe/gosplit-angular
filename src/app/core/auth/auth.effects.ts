import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AuthService } from './auth.service';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authLogin),
    mergeMap(({credential}) => this.authService.login(credential)
      .pipe(
        map(() => {
          this.router.navigate(['']);
          return AuthActions.authLoginSuccess();
        }),
        catchError((error) => of(AuthActions.authLoginFail({error: error.message}))),
      ),
    ),
    ),
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authLogout),
    mergeMap(() => this.authService.logout()
      .pipe(
        map(() => AuthActions.authLogoutSuccess()),
      ),
    ),
    ),
  );
}
