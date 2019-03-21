import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
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
    HeaderComponent,
    FooterComponent,
  ],
})
export class SharedModule {
}
