import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import { InvoiceItemInfoComponent } from './components/invoice-item-info/invoice-item-info.component';
import { InvoiceItemListComponent } from './components/invoice-item-list/invoice-item-list.component';
import { InvoiceTableDetailComponent } from './components/invoice-table-detail/invoice-table-detail.component';
import { InvoiceTableListComponent } from './components/invoice-table-list/invoice-table-list.component';
import { InvoiceUploadBoxComponent } from './components/invoice-upload-box/invoice-upload-box.component';
import { InvoiceItemShellComponent } from './containers/invoice-item-shell/invoice-item-shell.component';
import { InvoiceShellComponent } from './containers/invoice-shell/invoice-shell.component';
import { InvoiceTableShellComponent } from './containers/invoice-table-shell/invoice-table-shell.component';
import { InvoiceUploadShellComponent } from './containers/invoice-upload-shell/invoice-upload-shell.component';
import { ReceiptRoutingModule } from './invoice-routing.module';
import { InvoiceEffects } from './store/invoice.effects';
import { FEATURE_NAME, reducers } from './store/invoice.state';

@NgModule({
  declarations: [
    InvoiceUploadShellComponent,
    InvoiceTableListComponent,
    InvoiceItemShellComponent,
    InvoiceTableDetailComponent,
    InvoiceTableShellComponent,
    InvoiceUploadShellComponent,
    InvoiceUploadBoxComponent,
    InvoiceShellComponent,
    InvoiceItemInfoComponent,
    InvoiceItemListComponent,
  ],
  imports: [
    SharedModule,
    ReceiptRoutingModule,
    A11yModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([InvoiceEffects]),
  ],
})
export class InvoiceModule {
}
