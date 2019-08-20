import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../core/guards';
import { InvoiceItemShellComponent } from './containers/invoice-item-shell/invoice-item-shell.component';
import { InvoiceShellComponent } from './containers/invoice-shell/invoice-shell.component';
import { InvoiceTableShellComponent} from './containers/invoice-table-shell/invoice-table-shell.component';
import { InvoiceUploadShellComponent } from './containers/invoice-upload-shell/invoice-upload-shell.component';
import { ReceiptDetailResolverService } from './shared/receipt-detail-resolver.service';
import { ReceiptListResolverService } from './shared/receipt-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: InvoiceShellComponent,
    children: [
      {
        path: 'group/:groupId',
        component: InvoiceTableShellComponent,
      },
      {
        path: 'receipt/:receiptId',
        component: InvoiceItemShellComponent,
        // canActivate: [AuthGuard],
        // resolve: {
        //   receipt: ReceiptDetailResolverService,
        // },
      },
      {
        path: 'upload/:groupId',
        component: InvoiceUploadShellComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ReceiptDetailResolverService,
    ReceiptListResolverService,
    AuthGuard,
  ],
})
export class ReceiptRoutingModule {
}
