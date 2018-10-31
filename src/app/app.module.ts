import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LibraryComponent } from './components/library/library.component';
import { ThumbnailComponent } from './components/library/thumbnail/thumbnail.component';
import { UploadComponent } from './components/library/upload/upload.component';
import { SortComponent } from './components/library/sort/sort.component';
import { ReceiptDetailComponent } from './components/receipt-detail/receipt-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LibraryComponent,
    ThumbnailComponent,
    UploadComponent,
    SortComponent,
    ReceiptDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
