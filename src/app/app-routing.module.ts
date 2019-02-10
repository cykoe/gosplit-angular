import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ReceiptDetailPage } from './pages/receipt-detail/receipt-detail.page';
import { ReceiptListPage } from './pages/receipt-list/receipt-list.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/library',
    pathMatch: 'full',
  },
  {
    path: 'library',
    component: ReceiptListPage,
  },
  {
    path: 'library/:receiptId',
    component: ReceiptDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
