import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { ReceiptListTableDetailComponent } from './components/receipt-list-table-detail/receipt-list-table-detail.component';
import { ReceiptListTableComponent } from './components/receipt-list-table/receipt-list-table.component';
import { ReceiptUploadComponent } from './components/receipt-upload/receipt-upload.component';
import { ReceiptItemListShellComponent } from './containers/receipt-item-list-shell/receipt-item-list-shell.component';
import { ReceiptListShellComponent } from './containers/receipt-list-shell/receipt-list-shell.component';
import { ReceiptUploadShellComponent } from './containers/receipt-upload-shell/receipt-upload-shell.component';
import { ReceiptRoutingModule } from './receipt-routing.module';
import { ReceiptEffects } from './state/receipt.effects';
import * as fromReceipt from './state/receipt.reducer';

@NgModule({
  declarations: [
    ReceiptUploadShellComponent,
    ReceiptListTableComponent,
    ReceiptItemListShellComponent,
    ReceiptListTableDetailComponent,
    ReceiptListShellComponent,
    ReceiptUploadComponent,
  ],
  imports: [
    SharedModule,
    ReceiptRoutingModule,
    A11yModule,
    StoreModule.forFeature(fromReceipt.receiptFeatureKey, fromReceipt.receiptReducer),
    EffectsModule.forFeature([ReceiptEffects]),
  ],
  exports: [
    ReceiptListTableComponent,
  ],
})
export class ReceiptModule {
}
