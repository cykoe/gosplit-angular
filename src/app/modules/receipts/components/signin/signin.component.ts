import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  focus;
  focus1;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }, {updateOn: 'blur'});
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe((res) => {
      if (res.url) {
        this.router.navigate([res.url]);
      }
    });
  }

}
