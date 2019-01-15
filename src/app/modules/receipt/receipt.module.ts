import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { ReceiptRoutingModule } from './receipt-routing.module';
import { ReceiptListPage } from './pages/receipt-list/receipt-list.page';
import { ReceiptDetailPage } from './pages/receipt-detail/receipt-detail.page';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { UploadComponent } from './components/upload/upload.component';
import { LoadingBarComponent } from '../../shared/components/loading-bar/loading-bar.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    ReceiptRoutingModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  declarations: [
    ReceiptListPage,
    ReceiptDetailPage,
    ThumbnailComponent,
    UploadComponent,
    LoadingBarComponent,
    ListComponent
  ]
})
export class ReceiptModule {
}
