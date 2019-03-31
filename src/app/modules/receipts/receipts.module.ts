import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReceiptsRoutingModule } from './receipts-routing.module';

import { ReceiptDetailCardComponent } from './components/receipt-detail-card/receipt-detail-card.component';
import { ReceiptDetailHeaderComponent } from './components/receipt-detail-header/receipt-detail-header.component';
import { ReceiptListCardComponent } from './components/receipt-list-card/receipt-list-card.component';
import { ReceiptDetailPageComponent } from './pages/receipt-detail-page/receipt-detail-page.component';
import { ReceiptListPageComponent } from './pages/receipt-list-page/receipt-list-page.component';
import { ReceiptUploadPageComponent } from './pages/receipt-upload-page/receipt-upload-page.component';

@NgModule({
  declarations: [
    ReceiptUploadPageComponent,
    ReceiptListPageComponent,
    ReceiptDetailPageComponent,
    ReceiptListCardComponent,
    ReceiptDetailCardComponent,
    ReceiptDetailHeaderComponent,
  ],
  imports: [
    SharedModule,
    ReceiptsRoutingModule,
  ],
})
export class ReceiptsModule {
}
