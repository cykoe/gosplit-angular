import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReceiptsRoutingModule } from './receipts-routing.module';

import { ReceiptGroupCardComponent } from './components/receipt-group-card/receipt-group-card.component';
import { ReceiptListCardComponent } from './components/receipt-list-card/receipt-list-card.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReceiptDetailPageComponent } from './pages/receipt-detail-page/receipt-detail-page.component';
import { ReceiptGroupPageComponent } from './pages/receipt-group-page/receipt-group-page.component';
import { ReceiptListPageComponent } from './pages/receipt-list-page/receipt-list-page.component';
import { ReceiptUploadPageComponent } from './pages/receipt-upload-page/receipt-upload-page.component';
import { ReceiptGroupNewCardComponent } from './components/receipt-group-new-card/receipt-group-new-card.component';

@NgModule({
  declarations: [
    ReceiptUploadPageComponent,
    ReceiptListPageComponent,
    ReceiptDetailPageComponent,
    ReceiptListCardComponent,
    SignupComponent,
    SigninComponent,
    ReceiptGroupCardComponent,
    ReceiptGroupPageComponent,
    ReceiptGroupNewCardComponent,
  ],
  imports: [SharedModule, ReceiptsRoutingModule, A11yModule],
})
export class ReceiptsModule {}
