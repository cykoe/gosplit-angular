import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

const routes: Routes = [
  {
    path: 'register',
    component: UserRegisterComponent,
  },
  {
    path: 'login',
    component: UserLoginComponent,
  },
];

@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class UserModule { }
