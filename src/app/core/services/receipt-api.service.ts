import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of,throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Receipt } from '../../shared/models/receipt';
import { ReceiptSerializer } from '../../shared/serializers/receipt-serializer';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptApiService {

  constructor(
    private http: HttpClient,
    private receiptSerializer: ReceiptSerializer,
  ) {
  }

  readonly url: string = environment.api_url;
  readonly endpoint: string = 'store';

  create(item: Receipt): Observable<Receipt> {
    return this.http.post<Receipt>(`${this.url}/${this.endpoint}`, item)
      .pipe(
        map(data => this.receiptSerializer.fromJson(data) as Receipt)
      );
  }

  read(id: string): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.url}/${this.endpoint}/${id}`)
      .pipe(
        map(data => this.receiptSerializer.fromJson(data) as Receipt)
      );
  }

  list(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(`${this.url}/${this.endpoint}`)
      .pipe(
        map(data => this.convertData(data))
      );
  }

  update(item: Receipt): Observable<Receipt> {
    return this.http.put<Receipt>(`${this.url}/${this.endpoint}/${item.id}`, this.receiptSerializer.toJson(item))
      .pipe(
        map(data => this.receiptSerializer.fromJson(data) as Receipt)
      );
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${this.endpoint}/${id}`);
  }

  protected convertData(data: any): Receipt[] {
    return data.map((item: any) => this.receiptSerializer.fromJson(item));
  }
}
