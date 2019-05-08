import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSettingPageComponent } from './pages/dashboard-setting-page/dashboard-setting-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardSettingPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
