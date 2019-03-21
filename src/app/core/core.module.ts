import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { httpInterceptorProviders } from './interceptors';

const config: SocketIoConfig = {url: environment.api_url, options: {}};

@NgModule({
  imports: [
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    httpInterceptorProviders,
  ],
})
export class CoreModule {
}
