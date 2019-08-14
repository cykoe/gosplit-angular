import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../user.service';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../receipt/shared/user';
import * as ReceiptActions from '../../../receipt/state/receipt.actions';
import { ReceiptState } from '../../../receipt/state/receipt.reducer';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  form: FormGroup;
  focus;
  focus1;
  products$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private auth: UserService,
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
    this.auth.login(this.form.value)
      .subscribe((res: User) => {
        console.log(res);
        this.router.navigate([res.url]);
      });
  }

}
