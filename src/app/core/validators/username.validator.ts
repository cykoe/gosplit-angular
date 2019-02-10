import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

interface CheckedUsername {
  success: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class UsernameValidator implements AsyncValidator {
  constructor(
    private auth: AuthService,
  ) {
  }

  validate(
    ctrl: AbstractControl,
  ): Observable<ValidationErrors | null> |
    Promise<ValidationErrors | null> {
    return this.auth.checkUsername({username: ctrl.value}).pipe(
      map((isChecked: CheckedUsername) => isChecked.success ? null : {usernameWrong: true}),
      catchError(() => null),
    );
  }
}
