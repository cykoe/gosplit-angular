import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import {  RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import { AuthEffects } from './auth/auth.effects';
import { CustomSerializer, reducers } from './core.state';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  imports: [
    // angular
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    httpInterceptorProviders,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}},
  ],
})
export class CoreModule {
}
