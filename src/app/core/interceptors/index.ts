import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CachingInterceptor } from './caching.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { ProgressInterceptor } from './progress.interceptor';
import { ResponseInterceptor } from './response.interceptor';
import { TokenInterceptor } from './token.interceptor';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
];
