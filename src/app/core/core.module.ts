import { NgModule } from '@angular/core';
import { ReceiptInMemDataService } from '../receipt-in-mem-data.service';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  providers: [
    // httpInterceptorProviders,
  ],
})
export class CoreModule {
}
