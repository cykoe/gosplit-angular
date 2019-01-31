import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../core/services/auth.service';
import { UsernameValidator } from '../core/validators/username.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usernameValidator: UsernameValidator,
    private auth: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required], [this.usernameValidator.validate.bind(this)]],
      password: [null, [Validators.required]],
    }, {updateOn: 'blur'});
  }

  verifyPassword(password: string) {
    this.auth.login({username: this.loginForm.get('username').value, password});
  }
}
