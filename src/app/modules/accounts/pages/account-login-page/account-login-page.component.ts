import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { UsernameValidator } from '../../../../core/validators/username.validator';
import { AppConfig } from '../../../../configs/app.config';
import { HeaderService } from '../../../../core/services/header.service';

@Component({
  selector: 'app-account-login-page',
  templateUrl: './account-login-page.component.html',
  styleUrls: ['./account-login-page.component.scss'],
})
export class AccountLoginPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usernameValidator: UsernameValidator,
    private auth: AuthService,
    private router: Router,
    private headerService: HeaderService,
  ) {
  }

  ngOnInit(): void {
    this.headerService.headerTabChange$.subscribe((tab) => {
      if (tab === 'Home') {
        this.router.navigate([`/${AppConfig.routes.receipts}/${AppConfig.routes.home}`]);
      } else if (tab === 'About') {
        this.router.navigate([`/${AppConfig.routes.accounts}/${AppConfig.routes.login}`]);
      }
    });
    this.form = this.fb.group({
      // username: ['', [Validators.required], [this.usernameValidator.validate.bind(this)]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }, {updateOn: 'blur'});
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe(
      () => this.router.navigateByUrl('/'),
      () => {},
    );
  }}
