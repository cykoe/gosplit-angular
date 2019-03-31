import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppConfig } from './configs/app.config';

const routes: Routes = [
  {path: '', redirectTo: AppConfig.routes.receipts, pathMatch: 'full'},
  {path: AppConfig.routes.receipts, loadChildren: './modules/receipts/receipts.module#ReceiptsModule'},
  {path: AppConfig.routes.accounts, loadChildren: './modules/accounts/accounts.module#AccountsModule'},
  { path: '**', redirectTo: AppConfig.routes.receipts },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
