import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Receipt } from '../../shared/models/receipt';
import { ReceiptSerializer } from '../../shared/serializers/receipt-serializer';

@Injectable({
  providedIn: 'root',
})
export class ReceiptApiService {
  currentReceipt = this.socket.fromEvent<Receipt>('receipt');

  constructor(
    private http: HttpClient,
    private socket: Socket,
  ) {
  }

  readonly url: string = environment.api_url;
  readonly endpoint: string = 'store';

  create(item: Receipt): Observable<Receipt> {
    return this.http.post<Receipt>(`${this.url}/${this.endpoint}`, item)
      .pipe(
        map((data) => ReceiptSerializer.fromJson(data) as Receipt),
      );
  }

  read(id: string): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.url}/${this.endpoint}/${id}`)
      .pipe(
        map((data) => ReceiptSerializer.fromJson(data) as Receipt),
      );
  }

  list(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(`${this.url}/${this.endpoint}`)
      .pipe(
        map((data) => this.convertData(data)),
      );
  }

  update(item: Receipt): Observable<Receipt> {
    return this.http.put<Receipt>(`${this.url}/${this.endpoint}/${item.id}`, ReceiptSerializer.toJson(item))
      .pipe(
        map((data) => ReceiptSerializer.fromJson(data) as Receipt),
      );
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${this.endpoint}/${id}`);
  }

  protected convertData(data: any): Receipt[] {
    return data.map((item: any) => ReceiptSerializer.fromJson(item));
  }

  getReceipt(id: string) {
    this.socket.emit('getRec', id);
  }

  editReceipt(receipt: Receipt) {
    this.socket.emit('editRec', receipt);
  }
}
