import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../core/guards/auth-guard.service';
import { ReceiptLoginPageComponent } from './pages/receipt-login-page/receipt-login-page.component';
import { ReceiptRegisterPageComponent } from './pages/receipt-register-page/receipt-register-page.component';
import { ReceiptDetailPageComponent } from './pages/receipt-detail-page/receipt-detail-page.component';
import { ReceiptGroupPageComponent } from './pages/receipt-group-page/receipt-group-page.component';
import { ReceiptListPageComponent } from './pages/receipt-list-page/receipt-list-page.component';
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
    path: 'groups/:groupId',
    component: ReceiptListPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    resolve: {
      receipts: ReceiptListResolverService,
    },
  },
  {
    path: 'groups/:groupId/:mm/:dd/:yy/:store/:id',
    component: ReceiptDetailPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    resolve: {
      receipt: ReceiptDetailResolverService,
    },
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
export class ReceiptsRoutingModule {
}
