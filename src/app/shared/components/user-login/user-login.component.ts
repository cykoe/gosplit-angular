import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import * as authActions from '../../../core/auth/auth.actions';
import { AuthService } from '../../../core/auth/auth.service';
import { AppState } from '../../../core/core.state';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  form: FormGroup;
  focus;
  focus1;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],

    }, {updateOn: 'blur'});
  }

  /**
   * Submit the login credentials to authService
   * if successful redirect to original requested
   * url page
   */
  onSubmit(): void {
    this.store.dispatch(authActions.authLogin({credential: this.form.value}));
    // this.auth.login(this.form.value)
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.router.navigate([res.url]);
    //   });
  }

}
