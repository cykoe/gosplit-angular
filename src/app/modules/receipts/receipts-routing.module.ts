import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppConfig } from '../../configs/app.config';
import { AuthGuard } from '../../core/guards/auth-guard.service';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReceiptDetailPageComponent } from './pages/receipt-detail-page/receipt-detail-page.component';
import { ReceiptListPageComponent } from './pages/receipt-list-page/receipt-list-page.component';
import { ReceiptUploadPageComponent } from './pages/receipt-upload-page/receipt-upload-page.component';
import { ReceiptResolverService } from './shared/receipt-resolver.service';

const routes: Routes = [
  {
    path: AppConfig.routes.home,
    component: ReceiptListPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: AppConfig.routes.detail,
    component: ReceiptDetailPageComponent,
    pathMatch: 'full',
    resolve: {
      receipt: ReceiptResolverService,
    },
  },
  {
    path: AppConfig.routes.upload,
    component: ReceiptUploadPageComponent,
    pathMatch: 'full',
  },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ReceiptResolverService,
    AuthGuard,
  ],
})
export class ReceiptsRoutingModule {
}
