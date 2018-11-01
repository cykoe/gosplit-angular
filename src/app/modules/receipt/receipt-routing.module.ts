import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReceiptListPage } from './pages/receipt-list/receipt-list.page';
import { ReceiptDetailPage } from './pages/receipt-detail/receipt-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiptListPage
  },
  {
    path: ':receiptId',
    component: ReceiptDetailPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptRoutingModule {
}
