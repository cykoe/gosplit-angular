import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReceiptDetailPageComponent } from './pages/receipt-detail-page/receipt-detail-page.component';
import { ReceiptListPageComponent } from './pages/receipt-list-page/receipt-list-page.component';
import { ReceiptUploadPageComponent } from './pages/receipt-upload-page/receipt-upload-page.component';

import { AppConfig } from '../../configs/app.config';

const routes: Routes = [
  {
    path: AppConfig.routes.home,
    component: ReceiptListPageComponent,
    pathMatch: 'full',
  },
  {
    path: AppConfig.routes.detail,
    component: ReceiptDetailPageComponent,
    pathMatch: 'full',
  },
  {
    path: AppConfig.routes.upload,
    component: ReceiptUploadPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptsRoutingModule {
}
