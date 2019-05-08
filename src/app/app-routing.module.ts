import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from './configs/app.config';

import { DemoDetailComponent } from './shared/components/demo-detail/demo-detail.component';
import { DemoComponent } from './shared/components/demo/demo.component';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'demo', component: DemoComponent, pathMatch: 'full'},
  {path: 'demo/receipt', component: DemoDetailComponent, pathMatch: 'full'},
  {
    path: 'receipts',
    loadChildren: './modules/receipts/receipts.module#ReceiptsModule',
  },
  {
    path: 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
  },
  {path: '**', redirectTo: AppConfig.routes.receipts},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
