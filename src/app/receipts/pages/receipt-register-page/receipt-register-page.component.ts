import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services';

import { User } from '../../shared/user';

@Component({
  selector: 'app-signup',
  templateUrl: './receipt-register-page.component.html',
  styleUrls: ['./receipt-register-page.component.scss'],
})
export class ReceiptRegisterPageComponent implements OnInit {
  form: FormGroup;
  focus;
  focus1;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
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
   * Submit the register credentials to authService
   * if successful redirect to original requested
   * url page
   */
  onSubmit(): void {
    this.auth.register(this.form.value)
      .subscribe((res: User) => {
        this.router.navigate([res.url]);
    });
  }
}
