import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { UsernameValidator } from '../../core/validators/username.validator';

const MIN_LENGTH = 5;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  // hide = true;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private usernameValidator: UsernameValidator,
  ) {
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [null, [
        Validators.required,
        Validators.minLength(MIN_LENGTH)],
        [this.usernameValidator.validate.bind(this)],
      ],
      password: [null, [Validators.required, Validators.minLength(MIN_LENGTH)]],
    });
  }

  signup() {
    const username = this.signupForm.get('username').value;
    const password = this.signupForm.get('password').value;
    console.log(this.signupForm);
    console.log(this.signupForm.value);
    this.auth.signup({username, password});
  }

}
