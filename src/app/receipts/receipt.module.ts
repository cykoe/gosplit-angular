import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { ReceiptRoutingModule } from './receipt-routing.module';

import { EffectsModule } from '@ngrx/effects';
import { ReceiptGroupCardComponent } from './components/receipt-group-card/receipt-group-card.component';
import { ReceiptGroupNewCardComponent } from './components/receipt-group-new-card/receipt-group-new-card.component';
import { ReceiptListCardComponent } from './components/receipt-list-card/receipt-list-card.component';
import { ItemListShellComponent } from './containers/item-list-shell/item-list-shell.component';
import { ReceiptListShellComponent } from './containers/receipt-list-shell/receipt-list-shell.component';
import { ReceiptGroupPageComponent } from './pages/receipt-group-page/receipt-group-page.component';
import { ReceiptListPageComponent } from './pages/receipt-list-page/receipt-list-page.component';
import { ReceiptLoginPageComponent } from './pages/receipt-login-page/receipt-login-page.component';
import { ReceiptRegisterPageComponent } from './pages/receipt-register-page/receipt-register-page.component';
import { ReceiptUploadPageComponent } from './pages/receipt-upload-page/receipt-upload-page.component';
import { ReceiptEffects } from './state/receipt.effects';
import * as fromReceipt from './state/receipt.reducer';

@NgModule({
  declarations: [
    ReceiptUploadPageComponent,
    ReceiptListPageComponent,
    ItemListShellComponent,
    ReceiptListCardComponent,
    ReceiptRegisterPageComponent,
    ReceiptLoginPageComponent,
    ReceiptGroupCardComponent,
    ReceiptGroupPageComponent,
    ReceiptGroupNewCardComponent,
    ReceiptListShellComponent,
  ],
  imports: [
    SharedModule,
    ReceiptRoutingModule,
    A11yModule,
    StoreModule.forFeature(fromReceipt.scoreboardFeatureKey, fromReceipt.receiptReducer),
    EffectsModule.forFeature([ReceiptEffects]),
  ],
  exports: [
    ReceiptListPageComponent,
  ],
})
export class ReceiptModule {}
