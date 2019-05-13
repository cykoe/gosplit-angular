import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AppConfig } from '../../configs/app.config';

import { User } from '../../modules/dashboard/shared/user.model';
import { Group } from '../../modules/receipts/shared/group.model';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl = '/';
  readonly url: string = environment.api_url;
  readonly endpoint: string = 'user/';
  isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private headerService: HeaderService,
    private sb: MatSnackBar,
  ) {
    if (this.token) {
      this.isAuthenticated = true;
    }
  }

  get token() {
    return localStorage.getItem('token');
  }

  setAuth(data) {
    localStorage.setItem('token', data.token);
    this.isAuthenticated = true;
  }

  purgeAuth() {
    this.isAuthenticated = false;
  }

  checkUsername(login: any) {
    return this.http.post(`${this.url}/user`, login);
  }

  register(credentials): Observable<User> | any {
    return this.http.post(`${this.url}${this.endpoint}register`, credentials)
      .pipe(
        tap((data: any) => this.setAuth(data)),
        map((data: any) => {
          data.url = this.redirectUrl;
          return data;
        }),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return of(err.message);
        }),
      );
  }

  login(credentials): Observable<User> | any {
    return this.http.post(`${this.url}${this.endpoint}login`, credentials)
      .pipe(
        tap((data: any) => this.setAuth(data)),
        map((data: any) => {
          data.url = this.redirectUrl;
          return data;
        }),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return of(err.message);
        }),
      );
  }

  logout() {
    this.purgeAuth();
    return localStorage.clear();
  }

  listGroups(): Observable<Group[]> | any {
    return this.http.get<Group[]>(`${this.url}group`)
      .pipe(
        map((data) => {
          console.log(data);
          return data.map((group: any) => new Group(group));
        }),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return of([]);
        }),
      );
  }

  saveFriends(friendList: any): Observable<any> {
    return this.http.post<any>(`${this.url}group`, friendList);
  }

  updateFriends(friendList: any): Observable<any> {
    return this.http.put<any>(`${this.url}group`, friendList);
  }

}
