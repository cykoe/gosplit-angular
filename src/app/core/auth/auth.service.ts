import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ICredential } from './auth.model';

export interface Credential {
  username: string;
  password: string;
}

export interface Availability {
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url: string = environment.api_url;
  readonly registerUrl: string = 'user/register';
  readonly loginUrl: string = 'user/login';
  readonly checkUsernameUrl: string = 'user';
  redirectUrl = '';
  jwtHelper: any;

  constructor(
    private http: HttpClient,
    private sb: MatSnackBar,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  get isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  /**
   * Returns an observable to check whether the username is taken or not
   * @param username - username to check
   */
  checkUsername(username: string): Observable<Availability> {
    return this.http.post<Availability>(`${this.url}/${this.checkUsernameUrl}`, username)
      .pipe(
        catchError(this.handleError<Availability>('check username')),
      );
  }

  /**
   * Returns an observable to make a POST request to register
   * an account from the server
   * @param credential - contains username and password
   */
  register(credential: ICredential): Observable<any> {
    return this.http.post<any>(`${this.url}/${this.registerUrl}`, credential)
      .pipe(
        tap((data: any) => {
          localStorage.setItem('token', data.token);
          data.url = this.redirectUrl;
        }),
        catchError(this.handleError<any>('register')),
      );
  }

  /**
   * Returns an observable to make a POST request to login
   * @param credential - contains username and password
   */
  login(credential: ICredential): Observable<any> {
    console.log({credential});
    return this.http.post<any>(`${this.url}/${this.loginUrl}`, credential)
      .pipe(
        tap((data: any) => {
          localStorage.setItem('token', data.token);
          data.url = this.redirectUrl;
        }),
        catchError(this.handleError<any>('login')),
      );
  }

  /**
   * Clear all local storage variables
   */
  logout(): Observable<any> {
    return of(localStorage.clear());
  }

  /**
   * Returns a function that handle Http operation failures
   * This error handler lets the app continue to run as if no error occurred
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;
      this.sb.open(`${operation} failed: ${message}`, 'OK');
      throw new Error(`${operation} failed: ${message}`);
    };
  }
}
