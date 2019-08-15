import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards';
import { UserLoginComponent } from '../user/components/user-login/user-login.component';
import { UserRegisterComponent } from '../user/components/user-register/user-register.component';
import { ReceiptUploadShellComponent } from './containers/receipt-upload-shell/receipt-upload-shell.component';
import { ReceiptItemListShellComponent } from './containers/receipt-item-list-shell/receipt-item-list-shell.component';
import { ReceiptListShellComponent } from './containers/receipt-list-shell/receipt-list-shell.component';
import { ReceiptDetailResolverService } from './shared/receipt-detail-resolver.service';
import { ReceiptListResolverService } from './shared/receipt-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ReceiptListShellComponent,
    pathMatch: 'full',
  },
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
    component: ReceiptUploadShellComponent,
    pathMatch: 'full',
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
