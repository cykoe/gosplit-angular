import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProgressBarService } from '../services/progress-bar.service';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  constructor(
    private progressBarService: ProgressBarService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBarService.increase();

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.progressBarService.decrease();
        }
      }),
    );
  }
}
