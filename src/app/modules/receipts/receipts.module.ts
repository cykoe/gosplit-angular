import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReceiptsRoutingModule } from './receipts-routing.module';

import { ReceiptGroupCardComponent } from './components/receipt-group-card/receipt-group-card.component';
import { ReceiptGroupNewCardComponent } from './components/receipt-group-new-card/receipt-group-new-card.component';
import { ReceiptListCardComponent } from './components/receipt-list-card/receipt-list-card.component';
import { ReceiptDetailPageComponent } from './pages/receipt-detail-page/receipt-detail-page.component';
import { ReceiptGroupPageComponent } from './pages/receipt-group-page/receipt-group-page.component';
import { ReceiptListPageComponent } from './pages/receipt-list-page/receipt-list-page.component';
import { ReceiptLoginPageComponent } from './pages/receipt-login-page/receipt-login-page.component';
import { ReceiptRegisterPageComponent } from './pages/receipt-register-page/receipt-register-page.component';
import { ReceiptUploadPageComponent } from './pages/receipt-upload-page/receipt-upload-page.component';

@NgModule({
  declarations: [
    ReceiptUploadPageComponent,
    ReceiptListPageComponent,
    ReceiptDetailPageComponent,
    ReceiptListCardComponent,
    ReceiptRegisterPageComponent,
    ReceiptLoginPageComponent,
    ReceiptGroupCardComponent,
    ReceiptGroupPageComponent,
    ReceiptGroupNewCardComponent,
  ],
  imports: [
    SharedModule,
    ReceiptsRoutingModule,
    A11yModule,
  ],
})
export class ReceiptsModule {}
