import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material.module';

import { ReceiptItemListComponent } from '../receipts/components/receipt-item-list/receipt-item-list.component';
import { CreateFormDialogComponent } from './components/create-form-dialog/create-form-dialog.component';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { DemoDetailComponent } from './components/demo-detail/demo-detail.component';
import { DemoComponent } from './components/demo/demo.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableDialogComponent } from './components/table-dialog/table-dialog.component';
import { DisableControlDirective } from './directives/disable-control.directive';

@NgModule({
  declarations: [
    FooterComponent,
    DeleteConfirmDialogComponent,
    CreateFormDialogComponent,
    HomeComponent,
    NavbarComponent,
    DemoComponent,
    DemoDetailComponent,
    ReceiptItemListComponent,
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
    DemoComponent,
    DemoDetailComponent,
    ReceiptItemListComponent,
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
