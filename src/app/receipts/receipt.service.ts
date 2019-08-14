import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Receipt } from './shared/receipt.model';

import { AppConfig } from '../configs/app.config';
import { Group } from './shared/group.model';
import { IGroup, IReceipt } from './state/models';

export interface UploadUrlFile {
  uploadURL: string;
  photoFilename: string;
}

export interface EmptyReceipt {
  id: string;
  userId: string;
  groupId: string;
  store: string;
  payer: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  readonly url: string = `api/receipts`;

  constructor(
    private http: HttpClient,
    private sb: MatSnackBar,
  ) {
  }


  create(item: IReceipt): Observable<IReceipt> {
    return this.http.post<IReceipt>(`${this.url}/create`, item)
      .pipe(
        // tap((data) => console.log({data})),
        catchError(this.handleError<IReceipt>('create receipt')),
      );
  }

  read(itemId: string): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.url}/${itemId}`)
      .pipe(
        map((data) => !data ? undefined : new Receipt(data)),
        catchError(this.handleError<Receipt>('receiptSelected receipt')),
      );
  }

  update(item: IReceipt): Observable<IReceipt> {
    return this.http.post<IReceipt>(`${this.url}/update`, item)
      .pipe(
        // tap((data) => console.log({data})),
        catchError(this.handleError<IReceipt>('updateItem receipt')),
      );
  }

  delete(item: IReceipt): Observable<{}> {
    return this.http.post(`${this.url}/delete`, item)
      .pipe(
        tap((data) => console.log({data})),
        catchError(this.handleError<{}>('receiptDeleted receipt')),
      );
  }

  list(groupId: string): Observable<IReceipt[]> {
    return this.http.get<IReceipt[]>(`${this.url}`)
      .pipe(
        // tap((data) => console.log({data})),
        catchError(this.handleError<IReceipt[]>('list receipts')),
      );
  }

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

  listGroups(): Observable<Group[]> {
    return this.http.get<IGroup[]>(`${this.url}/group/list`)
      .pipe(
        map((data) => {
          return data.map((group: any) => new Group(group));
        }),
        catchError(this.handleError<Group[]>('list groups')),
      );
  }

  createGroup(group: any): Observable<any> {
    return this.http.post<any>(`${this.url}/group`, group);
  }

  updateGroup(group: any): Observable<any> {
    return this.http.put<any>(`${this.url}/group`, group);
  }

  deleteGroup(group: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/group/${group.id}`);
  }

  // handleError<T>(result?: T) {
  //   return (err: any): Observable<T> => {
  //     this.sb.open(err.message, 'OK', {duration: AppConfig.sbDuration});
  //     return of(result);
  //   };
  // }

  // getReceipt(id: st  ring) {
  //   this.socket.emit('getRec', id);
  // }

  // editReceipt(receipt: Receipt) {
  //   this.socket.emit('editRec', receipt);
  // }

  getUploadUrl(): Observable<UploadUrlFile> {
    return this.http.get<UploadUrlFile>(AppConfig.uploadUrl);
  }

  createReceiptNew(receipt: EmptyReceipt): Observable<Receipt> {
    return this.http.post<any>(AppConfig.createReceiptUrl, receipt);
  }

  uploadReceipt(url: string, file): Observable<any> {
    return this.http.put<any>(url, file);
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
