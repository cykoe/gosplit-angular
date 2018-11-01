import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptRoutingModule } from './receipt-routing.module';
import { ReceiptListPage } from './pages/receipt-list/receipt-list.page';
import { ReceiptDetailPage } from './pages/receipt-detail/receipt-detail.page';
import { SortComponent } from './components/sort/sort.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { UploadComponent } from './components/upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    ReceiptRoutingModule
  ],
  declarations: [
    ReceiptListPage,
    ReceiptDetailPage,
    SortComponent,
    ThumbnailComponent,
    UploadComponent
  ]
})
export class ReceiptModule {
}
