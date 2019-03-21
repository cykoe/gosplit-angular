import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountLoginPageComponent } from './pages/account-login-page/account-login-page.component';
import { AccountRegisterPageComponent } from './pages/account-register-page/account-register-page.component';

import { AppConfig } from '../../configs/app.config';

const routes: Routes = [
  {
    path: AppConfig.routes.register,
    component: AccountRegisterPageComponent,
    pathMatch: 'full',
  },
  {
    path: AppConfig.routes.login,
    component: AccountLoginPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {
}
