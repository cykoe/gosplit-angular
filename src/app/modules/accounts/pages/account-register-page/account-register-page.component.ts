import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { UsernameValidator } from '../../../../core/validators/username.validator';

const MIN_LENGTH = 5;

@Component({
  selector: 'app-account-register-page',
  templateUrl: './account-register-page.component.html',
  styleUrls: ['./account-register-page.component.scss'],
})
export class AccountRegisterPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private usernameValidator: UsernameValidator,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      // username: ['', [
      //   Validators.required,
      //   Validators.minLength(MIN_LENGTH)],
      //   [this.usernameValidator.validate.bind(this)],
      // ],
      username: ['', [Validators.required, Validators.minLength(MIN_LENGTH)]],
      password: ['', [Validators.required, Validators.minLength(MIN_LENGTH)]],
    });
  }

  onSubmit() {
    this.auth.register(this.form.value).subscribe(
      () => this.router.navigateByUrl('/'),
      () => {},
    );
  }

}
