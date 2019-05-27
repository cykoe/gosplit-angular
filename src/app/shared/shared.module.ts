import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material.module';

import { ReceiptDetailCardComponent } from '../modules/receipts/components/receipt-detail-card/receipt-detail-card.component';
import { ReceiptDetailFooterComponent } from '../modules/receipts/components/receipt-detail-footer/receipt-detail-footer.component';
import { ReceiptDetailHeaderComponent } from '../modules/receipts/components/receipt-detail-header/receipt-detail-header.component';
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
    ReceiptDetailCardComponent,
    ReceiptDetailFooterComponent,
    ReceiptDetailHeaderComponent,
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
    ReceiptDetailCardComponent,
    ReceiptDetailFooterComponent,
    ReceiptDetailHeaderComponent,
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
