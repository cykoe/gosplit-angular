import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: UserService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.token) {
      return next.handle(req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.auth.token}`,
          'x-api-key': 'd41d8cd98f00b204e9800998ecf8427e',
        }
      }));
    } else {
      return next.handle(req.clone({setHeaders: {'x-api-key': 'd41d8cd98f00b204e9800998ecf8427e'}}));
    }
  }
}
