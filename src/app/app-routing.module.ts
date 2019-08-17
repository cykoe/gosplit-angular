import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { DemoDetailComponent } from './shared/components/demo-detail/demo-detail.component';
// import { DemoComponent } from './shared/components/demo/demo.component';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // { path: 'demo', component: DemoComponent, pathMatch: 'full' },
  // { path: 'demo/receipt', component: DemoDetailComponent, pathMatch: 'full' },
  {
    path: 'invoices',
    loadChildren: () => import('./features/invoice/invoice.module').then((m) => m.InvoiceModule),
  },
  {
    path: 'groups',
    loadChildren: () => import('./features/group/group.module').then((m) => m.GroupModule),
  },
  // { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
