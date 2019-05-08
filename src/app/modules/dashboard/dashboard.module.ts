import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardSettingPageComponent } from './pages/dashboard-setting-page/dashboard-setting-page.component';

@NgModule({
  declarations: [
    DashboardSettingPageComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {
}
