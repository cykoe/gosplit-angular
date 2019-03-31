import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { AppConfig } from '../../../configs/app.config';
import { Person } from '../../receipts/shared/person.model';
import { Receipt } from '../../receipts/shared/receipt.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private sb: MatSnackBar,
  ) { }

  readonly url: string = environment.api_url;
  readonly endpoint: string = 'user/';

  list(): Observable<Person[]> | any {
    return this.http.get<Person[]>(`${this.url}${this.endpoint}info`)
      .pipe(
        map((data: any) => {
          return data.map((receipt: any) => new Person(receipt));
        }),
        catchError(this.handleError([])),
      );
  }

  update(people: Person[]): Observable<Person[]> | any {
    return this.http.put<Person[]>(`${this.url}${this.endpoint}info`, people.map((p) => p.toJson()))
      .pipe(
        map((data: any) => data.map((receipt: any) => new Person(receipt))),
        catchError(this.handleError(people)),
      );
  }

  handleError<T>(result?: T) {
    return (err: any): Observable<T> => {
      this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
      return of(result);
    };
  }
}
