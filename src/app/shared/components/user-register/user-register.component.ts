import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
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
      .subscribe((res) => {
        this.router.navigate([res.url]);
      });
  }
}
