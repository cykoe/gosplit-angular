import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ReceiptService } from '../receipt.service';
import { Receipt } from '../shared/receipt.model';
import * as ReceiptActions from './receipt.actions';

@Injectable()
export class ReceiptEffects {
  constructor(
    private actions$: Actions,
    private receiptService: ReceiptService,
  ) {
  }

  // createReceipts$ = createEffect(() => this.actions$.pipe(
  //   ofType(ReceiptActions.createReceipt),
  //   mergeMap(() => this.receiptService.create('adsa')
  //     .pipe(
  //       map((receipt) => ReceiptActions.createReceiptSuccess(receipt)),
  //       catchError(() => of(ReceiptActions.createReceiptFail({message: 'failed'}))),
  //     ),
  //   ),
  // ));

  // readReceipts$ = createEffect(() => this.actions$.pipe(
  //   ofType(ReceiptActions.readReceipt),
  //   mergeMap(() => this.receiptService.receiptSelected('adsa')
  //     .pipe(
  //       map((receipt) => ReceiptActions.readReceiptSuccess(receipt)),
  //       catchError(() => of(ReceiptActions.readReceiptFail({message: 'failed'}))),
  //     ),
  //   ),
  // ));

  listReceipts$ = createEffect(() => this.actions$.pipe(
    ofType(ReceiptActions.listReceipt.type),
    mergeMap((action) => this.receiptService.list(action)
      .pipe(
        map((receipts) => {
          return ReceiptActions.listReceiptSuccess({receipts});
        }),
        catchError((err) => {
          console.error({err});
          return of(ReceiptActions.listReceiptFail({message: 'failed'}));
        }),
      ),
    ),
  ));
}
