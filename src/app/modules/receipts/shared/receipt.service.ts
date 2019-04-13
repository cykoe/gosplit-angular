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

  create(item: any): Observable<Receipt> | any {
    return this.http.post<Receipt>(`${this.url}${this.endpoint}`, item)
      .pipe(
        map((data) => new Receipt(data)),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return throwError(err);
        }),
      );
  }

  read(itemId: string): Observable<Receipt> | any {
    return this.http.get<Receipt>(`${this.url}${this.endpoint}${itemId}`)
      .pipe(
        map((data) => {
          if (!data) {
            return undefined;
          }
          return new Receipt(data);
        }),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return of(undefined);
        }),
      );
  }

  update(item: Receipt): Observable<Receipt> | any {
    return this.http.put<Receipt>(`${this.url}${this.endpoint}${item.id}`, item.toJson())
      .pipe(
        map((data) => new Receipt(data)),
        catchError((err): any => {
          this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
          return throwError(err);
        }),
      );
  }

  delete(item: Receipt): any {
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

  // getReceipt(id: string) {
  //   this.socket.emit('getRec', id);
  // }

  // editReceipt(receipt: Receipt) {
  //   this.socket.emit('editRec', receipt);
  // }
}
