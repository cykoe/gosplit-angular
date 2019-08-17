import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token) {
      return next.handle(req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.authService.token}`,
          'x-api-key': environment.api_key,
        },
      }));
    } else {
      return next.handle(req.clone({
        setHeaders: {
          'x-api-key': environment.api_key,
        },
      }));
    }
  }
}
