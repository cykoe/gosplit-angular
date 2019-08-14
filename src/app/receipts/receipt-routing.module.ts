import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth-guard.service';
import { ReceiptItemListShellComponent } from './containers/receipt-item-list-shell/receipt-item-list-shell.component';
import { ReceiptListShellComponent } from './containers/receipt-list-shell/receipt-list-shell.component';
import { ReceiptGroupPageComponent } from './pages/receipt-group-page/receipt-group-page.component';
import { ReceiptListTableComponent } from './components/receipt-list-table/receipt-list-table.component';
import { ReceiptLoginPageComponent } from './pages/receipt-login-page/receipt-login-page.component';
import { ReceiptRegisterPageComponent } from './pages/receipt-register-page/receipt-register-page.component';
import { ReceiptUploadPageComponent } from './pages/receipt-upload-page/receipt-upload-page.component';
import { ReceiptDetailResolverService } from './shared/receipt-detail-resolver.service';
import { ReceiptListResolverService } from './shared/receipt-list-resolver.service';
const routes: Routes = [
  {
    path: 'groups',
    component: ReceiptGroupPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ReceiptListShellComponent,
    pathMatch: 'full',
  },
  // {
  //   path: 'groups/:groupId',
  //   component: ReceiptListPageComponent,
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   resolve: {
  //     receipts: ReceiptListResolverService,
  //   },
  // },
  {
    // path: 'groups/:groupId/:mm/:dd/:yy/:store/:id',
    path: 'items',
    component: ReceiptItemListShellComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard],
    // resolve: {
    //   receipt: ReceiptDetailResolverService,
    // },
  },
  {
    path: 'upload',
    component: ReceiptUploadPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: ReceiptRegisterPageComponent,
  },
  {
    path: 'login',
    component: ReceiptLoginPageComponent,
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
