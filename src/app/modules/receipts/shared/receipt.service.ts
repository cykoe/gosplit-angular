import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Receipt } from './receipt.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  currentReceipt = this.socket.fromEvent<Receipt>('receipt');

  constructor(
    private http: HttpClient,
    private socket: Socket,
  ) {
  }

  readonly url: string = environment.api_url;
  readonly endpoint: string = 'store/';

  create(item: Receipt): Observable<Receipt> {
    return this.http.post<Receipt>(`${this.url}${this.endpoint}`, item.toJson())
      .pipe(
        map((data) => new Receipt(data)),
      );
  }

  read(item: Receipt): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.url}${this.endpoint}${item.id}`)
      .pipe(
        map((data) => new Receipt(data)),
      );
  }

  update(item: Receipt): Observable<Receipt> {
    return this.http.put<Receipt>(`${this.url}${this.endpoint}${item.id}`, item.toJson())
      .pipe(
        map((data) => new Receipt(data)),
      );
  }

  delete(item: Receipt) {
    return this.http.delete(`${this.url}${this.endpoint}${item.id}`);
  }

  list(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(`${this.url}${this.endpoint}`)
      .pipe(
        map((data) => data.map((item: any) => new Receipt(item))),
      );
  }

  getReceipt(id: string) {
    this.socket.emit('getRec', id);
  }

  editReceipt(receipt: Receipt) {
    this.socket.emit('editRec', receipt);
  }
}
