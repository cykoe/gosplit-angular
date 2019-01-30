import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  readonly url: string = environment.api_url;

  checkUsername(loginInfo: any) {
    return this.http.post(`${this.url}/user`, loginInfo);
  }
}
