import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { JwtModule } from '@auth0/angular-jwt';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { httpInterceptorProviders } from './core/interceptors';
import { ReceiptInMemDataService } from './receipt-in-mem-data.service';
import { ReceiptModule } from './receipt/receipt.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

export function tokenGetter() {return localStorage.getItem('access_token'); }

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    UserModule,
    // HttpClientInMemoryWebApiModule.forRoot(ReceiptInMemDataService, {dataEncapsulation: false}),
    AppRoutingModule,
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['example.com', 'https://g76cvz4t6c.execute-api.us-east-2.amazonaws.com'],
        blacklistedRoutes: ['example.com/examplebadroute/'],
      },
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ReceiptModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}},
    httpInterceptorProviders,
  ],
})
export class AppModule {
}
