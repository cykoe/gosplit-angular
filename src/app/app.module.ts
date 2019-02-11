import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { httpInterceptorProviders } from './core/interceptors';

import {environment} from '../environments/environment';
import { AppComponent } from './app.component';
import { ListComponent} from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { UploadComponent } from './components/upload/upload.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { ReceiptDetailPage } from './pages/receipt-detail/receipt-detail.page';
import { ReceiptListPage } from './pages/receipt-list/receipt-list.page';
import { LoadingBarComponent } from './shared/components/loading-bar/loading-bar.component';

const config: SocketIoConfig = { url: environment.api_url, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ReceiptListPage,
    ReceiptDetailPage,
    ThumbnailComponent,
    UploadComponent,
    LoadingBarComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {
}
