import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      map((event: HttpResponse<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body.success) {
            return event.clone({body: event.body.data});
          } else {
            throw new Error(event.body.message);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }),
    );
  }
}
