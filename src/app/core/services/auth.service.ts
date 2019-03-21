import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AppConfig } from '../../configs/app.config';

import { User } from '../../modules/accounts/shared/user.model';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url: string = environment.api_url;
  readonly endpoint: string = 'user/';
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticated$.asObservable();

  constructor(
    private http: HttpClient,
    private headerService: HeaderService,
    private sb: MatSnackBar,
  ) {
  }

  get token() {
    return localStorage.getItem('token');
  }

  setAuth(data) {
    localStorage.setItem('token', data.token);
    this.isAuthenticated$.next(true);
  }

  purgeAuth() {
    this.isAuthenticated$.next(false);
  }

  checkUsername(login: any) {
    return this.http.post(`${this.url}/user`, login);
  }

  register(credentials): Observable<User> | any {
    return this.http.post(`${this.url}${this.endpoint}register`, credentials)
      .pipe(
        tap((data: any) => this.setAuth(data)),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return throwError(err.message);
        }),
      );
  }

  login(credentials): Observable<User> | any {
    return this.http.post(`${this.url}${this.endpoint}login`, credentials)
      .pipe(
        tap((data: any) => this.setAuth(data)),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return throwError(err.message);
        }),
      );
  }

  logout() {
    this.purgeAuth();
    return localStorage.clear();
  }
}
