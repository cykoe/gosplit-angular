import { HttpBackend, HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Receipt } from './shared/receipt.model';

import { environment } from '../../../environments/environment';
import { IReceipt } from './store/models';

export interface UploadUrlInfo {
  uploadURL: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  readonly url: string = `${environment.api_url}/receipt`;

  private httpClientSkip: HttpClient;

  constructor(
    private http: HttpClient,
    private sb: MatSnackBar,
    private handler: HttpBackend,
  ) {
    this.httpClientSkip = new HttpClient(handler);
  }

  create(item: Partial<IReceipt>): Observable<IReceipt> {
    return this.http.post<IReceipt>(`${this.url}/create`, item);
  }

  read(itemId: string): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.url}/${itemId}`)
      .pipe(
        map((data) => !data ? undefined : new Receipt(data)),
        catchError(this.handleError<Receipt>('receiptSelected receipt')),
      );
  }

  update(item: IReceipt): Observable<IReceipt> {
    return this.http.post<IReceipt>(`${this.url}/update`, item);
  }

  delete(item: IReceipt): Observable<IReceipt> {
    return this.http.post<IReceipt>(`${this.url}/delete`, item);
  }

  list(groupId: string): Observable<IReceipt[]> {
    return this.http.post<IReceipt[]>(`${this.url}/list`, {groupId});
  }

  // TODO: AI stuffs
  // autoSelect(receipt: Receipt): Observable<Receipt> {
  //   return this.http.get<Receipt[]>(`${this.url}${this.receiptUrl}`)
  //     .pipe(
  //       map((data) => {
  //         // parse to train format
  //         const train = new Map<string, {}>();
  //         data.forEach((r) => {
  //           r.list.forEach((item) => {
  //             if (train.has(item.name)) {
  //               const itemN = train.get(item.name);
  //               // item.people.forEach((person) => person.selection ? itemN[person.name]++ : null);
  //               itemN['length']++;
  //             } else {
  //               train.set(item.name, {});
  //               const itemN = train.get(item.name);
  //               // item.people.forEach((person) => itemN[person.name] = person.selection ? 1 : 0);
  //               itemN['length'] = 1;
  //             }
  //           });
  //         });
  //         // do baseline algorithm
  //         for (const item of receipt.list) {
  //           if (train.has(item.name)) {
  //             const itemN = train.get(item.name);
  //             for (const person in itemN) {
  //               if (itemN.hasOwnProperty(person) && person !== 'length') {
  //                 // const p = item.people.find((p) => p.name === person);
  //                 // p.selection = itemN[person] / itemN['length'] >= 0.5;
  //               }
  //             }
  //           }
  //         }
  //
  //         return receipt;
  //       }),
  //     );
  // }

  getUploadUrl(): Observable<UploadUrlInfo> {
    return this.http.get<UploadUrlInfo>(`${this.url}/getUploadUrl`);
  }

  upload(url: string, file): Observable<any> {
    return this.httpClientSkip.put<any>(url, file);
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;
      this.sb.open(`${operation} failed: ${message}`, 'OK');
      throw new Error(`${operation} failed: ${message}`);
    };
  }
}
