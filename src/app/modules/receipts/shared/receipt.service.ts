import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';

import { MatSnackBar } from '@angular/material';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Receipt } from './receipt.model';

import { environment } from '../../../../environments/environment';
import { AppConfig } from '../../../configs/app.config';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  // currentReceipt = this.socket.fromEvent<Receipt>('receipt');

  constructor(
    private http: HttpClient,
    // private socket: Socket,
    private sb: MatSnackBar,
  ) {
  }

  readonly url: string = environment.api_url;
  readonly endpoint: string = 'store/';

  create(item: any): Observable<Receipt | {}> {
    return this.http.post<Receipt>(`${this.url}${this.endpoint}`, item)
      .pipe(
        map((data) => new Receipt(data)),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return throwError(err);
        }),
      );
  }

  read(itemId: string): Observable<Receipt | {}> {
    return this.http.get<Receipt>(`${this.url}${this.endpoint}${itemId}`)
      .pipe(
        map((data) => !data ? undefined : new Receipt(data)),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return of(undefined);
        }),
      );
  }

  update(item: Receipt): Observable<Receipt | {}> {
    return this.http.put<Receipt>(`${this.url}${this.endpoint}${item.id}`, item.toJson())
      .pipe(
        map((data) => new Receipt(data)),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return throwError(err);
        }),
      );
  }

  delete(item: Receipt): Observable<{}> {
    return this.http.delete(`${this.url}${this.endpoint}${item.id}`)
      .pipe(
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return throwError(err);
        }),
      );
  }

  list(): Observable<Receipt[]> | any {
    return this.http.get<Receipt[]>(`${this.url}${this.endpoint}`)
      .pipe(
        map((data) => data.map((receipt: any) => new Receipt(receipt))),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return of([]);
        }),
      );
  }

  autoSelect(receipt: Receipt): Observable<Receipt> {
    return this.http.get<Receipt[]>(`${this.url}${this.endpoint}`)
      .pipe(
        map((data) => {
          // parse to train format
          const train = new Map<string, {}>();
          data.forEach((r) => {
            r.list.forEach((item) => {
              if (train.has(item.name)) {
                const itemN = train.get(item.name);
                item.people.forEach((person) => person.selection ? itemN[person.name]++ : null);
                itemN['length']++;
              } else {
                train.set(item.name, {});
                const itemN = train.get(item.name);
                item.people.forEach((person) => itemN[person.name] = person.selection ? 1 : 0);
                itemN['length'] = 1;
              }
            });
          });
          // do baseline algorithm
          for (const item of receipt.list) {
            if (train.has(item.name)) {
              const itemN = train.get(item.name);
              for (const person in itemN) {
                if (itemN.hasOwnProperty(person) && person !== 'length') {
                  const p = item.people.find((p) => p.name === person);
                  p.selection = itemN[person] / itemN['length'] >= 0.5;
                }
              }
            }
          }

          return receipt;
        }),
      );
  }

  // getReceipt(id: string) {
  //   this.socket.emit('getRec', id);
  // }

  // editReceipt(receipt: Receipt) {
  //   this.socket.emit('editRec', receipt);
  // }
}
