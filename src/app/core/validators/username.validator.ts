import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserService, Availability } from '../services';

@Injectable({providedIn: 'root'})
export class UsernameValidator implements AsyncValidator {
  constructor(
    private auth: UserService,
  ) {
  }

  validate(
    ctrl: AbstractControl,
  ): Observable<ValidationErrors | null> |
    Promise<ValidationErrors | null> {
    return this.auth.checkUsername(ctrl.value)
      .pipe(
        map((isChecked: Availability) => isChecked.success ? null : {usernameWrong: true}),
        catchError(() => null),
      );
  }
}
