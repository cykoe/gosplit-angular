import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReceiptsRoutingModule } from './receipts-routing.module';

import { ReceiptCardComponent } from './components/receipt-card/receipt-card.component';
import { ReceiptDetailPageComponent } from './pages/receipt-detail-page/receipt-detail-page.component';
import { ReceiptListPageComponent } from './pages/receipt-list-page/receipt-list-page.component';
import { ReceiptUploadPageComponent } from './pages/receipt-upload-page/receipt-upload-page.component';
import { ReceiptDetailCardComponent } from './components/receipt-detail-card/receipt-detail-card.component';

@NgModule({
  declarations: [
    ReceiptUploadPageComponent,
    ReceiptListPageComponent,
    ReceiptDetailPageComponent,
    ReceiptCardComponent,
    ReceiptDetailCardComponent,
  ],
  imports: [
    SharedModule,
    ReceiptsRoutingModule,
  ],
})
export class ReceiptsModule {
}
