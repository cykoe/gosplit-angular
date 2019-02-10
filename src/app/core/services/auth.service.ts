import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

interface LoginInfo {
  username?: string;
  password?: string;
}

interface LoginRes {
  success: boolean;
  token?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  readonly url: string = environment.api_url;

  checkUsername(login: LoginInfo) {
    return this.http.post(`${this.url}/user`, login);
  }

  login(login: LoginInfo) {
    this.http.post(`${this.url}/user/login`, login).subscribe(
      (res: LoginRes) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/library']);
        }
      },
      (err) => console.error(err),
    );
  }

  get token() {
    return localStorage.getItem('token');
  }
}
