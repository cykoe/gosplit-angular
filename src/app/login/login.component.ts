import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../core/services/login.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  addressForm = this.fb.group({
    company: null,
    username: [null, Validators.required],
    password: [null, Validators.required],
  });
  cUsername$: Observable<any>;
  private vUsername$ = new Subject<string>();
  private vPassword$ = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private auth: LoginService) {
  }

  ngOnInit() {
    console.log('hi');
    this.cUsername$ = this.vUsername$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(username => this.auth.checkUsername({username}))
    );
  }

  verifyUsername(username: string) {
    this.vUsername$.next(username);
  }

  verifyPassword(password: string) {
    this.vPassword$.next(password);
  }
}
