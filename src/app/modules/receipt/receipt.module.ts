import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

import { ReceiptRoutingModule } from './receipt-routing.module';
import { ReceiptListPage } from './pages/receipt-list/receipt-list.page';
import { ReceiptDetailPage } from './pages/receipt-detail/receipt-detail.page';
import { SortComponent } from './components/sort/sort.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { UploadComponent } from './components/upload/upload.component';
import { LoadingBarComponent } from '../../shared/components/loading-bar/loading-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ReceiptRoutingModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatButtonModule
  ],
  declarations: [
    ReceiptListPage,
    ReceiptDetailPage,
    SortComponent,
    ThumbnailComponent,
    UploadComponent,
    LoadingBarComponent
  ]
})
export class ReceiptModule {
}
