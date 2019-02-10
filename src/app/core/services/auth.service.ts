import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { HeaderService } from './header.service';

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
    private headerService: HeaderService,
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
          this.headerService.changeTab('Home');
        }
      },
      (err) => console.error(err),
    );
  }

  get token() {
    return localStorage.getItem('token');
  }

  logout() {
    return localStorage.clear();
  }
}
