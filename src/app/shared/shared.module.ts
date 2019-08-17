import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './modules/material.module';

import { CreateFormDialogComponent } from './components/create-form-dialog/create-form-dialog.component';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
// TODO: fix demo app
// import { DemoDetailComponent } from './components/demo-detail/demo-detail.component';
// import { DemoComponent } from './components/demo/demo.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableDialogComponent } from './components/table-dialog/table-dialog.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { DisableControlDirective } from './directives/disable-control.directive';

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
    FooterComponent,
    DeleteConfirmDialogComponent,
    CreateFormDialogComponent,
    HomeComponent,
    NavbarComponent,
    UserLoginComponent,
    UserRegisterComponent,
    // DemoComponent,
    // DemoDetailComponent,
    // ReceiptItemListComponent,
    DisableControlDirective,
    TableDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    FooterComponent,
    NavbarComponent,
    // DemoComponent,
    // DemoDetailComponent,
    // ReceiptItemListComponent,
    DisableControlDirective,
  ],
  entryComponents: [
    DeleteConfirmDialogComponent,
    CreateFormDialogComponent,
    TableDialogComponent,
  ],
})
export class SharedModule {
}
