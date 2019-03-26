import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AccountsRoutingModule} from './accounts-routing.module';

import { AccountLoginPageComponent } from './pages/account-login-page/account-login-page.component';
import { AccountRegisterPageComponent } from './pages/account-register-page/account-register-page.component';
import { AccountSettingPageComponent } from './pages/account-setting-page/account-setting-page.component';

@NgModule({
  declarations: [
    AccountLoginPageComponent,
    AccountRegisterPageComponent,
    AccountSettingPageComponent,
  ],
  imports: [
    SharedModule,
    AccountsRoutingModule,
  ],
})
export class AccountsModule {
}
