import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as fromReceipt from './index';

import { ReceiptService } from '../receipt.service';
import * as ReceiptActions from './receipt.actions';

@Injectable()
export class ReceiptEffects {
  constructor(
    private actions$: Actions,
    private receiptService: ReceiptService,
    private store: Store<fromReceipt.State>,
  ) {
  }

  createReceipts$ = createEffect(() => this.actions$.pipe(
    ofType(ReceiptActions.createReceipt),
    mergeMap((action) => this.receiptService.create(action.receipt)
      .pipe(
        map((receipt) => ReceiptActions.createReceiptSuccess({receipt})),
        catchError((error) => of(ReceiptActions.createReceiptFail({error}))),
      ),
    ),
  ));

  updateReceipts$ = createEffect(() => this.actions$.pipe(
    ofType(ReceiptActions.updateReceipt),
    withLatestFrom(this.store.pipe(select(fromReceipt.getCurrentReceipt))),
    mergeMap(([action, r]) => this.receiptService.update(r)
      .pipe(
        map((receipt) => ReceiptActions.updateReceiptSuccess({receipt})),
        catchError((error) => of(ReceiptActions.updateReceiptFail({error}))),
      ),
    ),
  ));

  deleteReceipts$ = createEffect(() => this.actions$.pipe(
    ofType(ReceiptActions.deleteReceipt),
    mergeMap((action) => this.receiptService.delete(action.receipt)
      .pipe(
        map((receipt) => {
          console.log({receipt});
          return ReceiptActions.deleteReceiptSuccess({id: 'no'});
        }),
        catchError((error) => of(ReceiptActions.deleteReceiptFail({error}))),
      ),
    ),
  ));

  listReceipts$ = createEffect(() => this.actions$.pipe(
    ofType(ReceiptActions.listReceipt),
    mergeMap((action) => this.receiptService.list(action.groupId)
      .pipe(
        map((receipts) => {
          return ReceiptActions.listReceiptSuccess({receipts});
        }),
        catchError((err) => {
          const error = {message: err.message};
          return of(ReceiptActions.listReceiptFail({error}));
        }),
      ),
    ),
  ));

}
