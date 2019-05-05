import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCacheService } from '../services';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!isCachable(req)) {
      return next.handle(req);
    }
    console.log('received from cache');
    const cachedResponse = this.cache.get(req);
    return cachedResponse ? of(cachedResponse) : sendRequest(req, next, this.cache);
  }
}

function isCachable(req: HttpRequest<any>) {
  return req.method === 'GET';
}

function sendRequest(
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: RequestCacheService): Observable<HttpEvent<any>> {
  const noHeadersReq = req.clone({setHeaders: {}});

  return next.handle(noHeadersReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.put(req, event);
      }
    }),
  );
}
