import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './token.interceptor';
import { LoggingInterceptor } from '../validators/logging.interceptor';
import { CachingInterceptor } from '../validators/caching.interceptor';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
];
