import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import { InvoiceTableListComponent } from './components/invoice-table-list/invoice-table-list.component';
import { InvoiceUploadBoxComponent } from './components/invoice-upload-box/invoice-upload-box.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemNewCardComponent } from './components/item-new-card/item-new-card.component';
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
    InvoiceTableShellComponent,
    InvoiceUploadShellComponent,
    InvoiceUploadBoxComponent,
    InvoiceShellComponent,
    ItemNewCardComponent,
    ItemCardComponent,
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
