import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from './configs/app.config';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {
    path: 'receipts',
    loadChildren: './modules/receipts/receipts.module#ReceiptsModule',
  },
  {
    path: 'accounts',
    loadChildren: './modules/accounts/accounts.module#AccountsModule',
  },
  {path: '**', redirectTo: AppConfig.routes.receipts},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
