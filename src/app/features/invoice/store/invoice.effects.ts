import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { forkJoin, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { InvoiceService } from '../invoice.service';

import * as fromRoot from '../../../core/core.state';
import * as fromInvoice from './invoice.state';
import * as ItemActions from './item.actions';
import * as PersonActions from './person.actions';
import * as ReceiptActions from './receipt.actions';

@Injectable()
export class InvoiceEffects {
  constructor(
    private actions$: Actions,
    private receiptService: InvoiceService,
    private store: Store<fromRoot.AppState>,
  ) {}

  createReceipts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiptActions.createReceipt),
      mergeMap((action) =>
        this.receiptService.create(action.receipt).pipe(
          map((receipt) => ReceiptActions.createReceiptSuccess({ receipt })),
          catchError((error) => of(ReceiptActions.createReceiptFail({ error }))),
        ),
      ),
    ),
  );

  updateSplit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PersonActions.updatePeopleSplit),
      withLatestFrom(
        this.store.pipe(select(fromInvoice.selectAllItems)),
        this.store.pipe(select(fromInvoice.selectAllPeople)),
      ),
      mergeMap(([_, items, people]) => {
        people.forEach((p) => (p.price = 0));
        items.forEach((item) => {
          const split = item.price / item.personIds.length;
          item.personIds.forEach((id) => {
            people.find((p) => p.name === id).price += split;
          });
        });
        return of(PersonActions.updatePeopleSuccess({ people }));
      }),
    ),
  );

  updateReceipts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiptActions.updateReceipt),
      withLatestFrom(
        this.store.pipe(select(fromInvoice.selectAllItems)),
        this.store.pipe(select(fromInvoice.selectAllPeople)),
      ),
      mergeMap(([{ receipt }, items, people]) =>
        this.receiptService.update({ ...receipt, list: items, people }).pipe(
          map((r) => ReceiptActions.updateReceiptSuccess({ receipt: r })),
          catchError((error) => of(ReceiptActions.updateReceiptFail({ error }))),
        ),
      ),
    ),
  );

  deleteReceipts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiptActions.deleteReceipt),
      mergeMap((action) =>
        this.receiptService.delete(action.receipt).pipe(
          map((receipt) => ReceiptActions.deleteReceiptSuccess({ id: receipt.id })),
          catchError((error) => of(ReceiptActions.deleteReceiptFail({ error }))),
        ),
      ),
    ),
  );

  listReceipts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiptActions.listReceipt),
      withLatestFrom(this.store.pipe(select(fromRoot.selectRouterState))),
      mergeMap(([_, route]) =>
        this.receiptService.list(route.state.params.groupId).pipe(
          switchMap((receipts) => {
            const actions = [];
            receipts.forEach((receipt) => {
              receipt.list.forEach((item) => {
                actions.push(
                  ItemActions.createItem({
                    // TODO: change database please
                    // item: { ...item, receiptId: receipt.id },
                    item: { ...item, receiptId: receipt.id, id: uuid() },
                  }),
                );
              });
            });
            actions.push(ReceiptActions.listReceiptSuccess({ receipts }));

            return actions;
          }),
          catchError((err) => {
            const error = { message: err.message };
            return of(ReceiptActions.listReceiptFail({ error }));
          }),
        ),
      ),
    ),
  );

  createPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiptActions.setCurrentReceiptId),
      withLatestFrom(this.store.pipe(select(fromInvoice.selectCurrentReceipt))),
      mergeMap(([_, receipt]) => {
        const actions = [];
        // TODO: backend needs populate people for new receipt, once done, remove if statement
        if (receipt.people && receipt.people[0]) {
          receipt.people.forEach((person) => {
            actions.push(PersonActions.createPerson({ person }));
          });
        }
        return actions;
      }),
    ),
  );

  getUploadUrl$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiptActions.uploadReceipt),
      switchMap((action) =>
        forkJoin(of(action), this.receiptService.getUploadUrl()),
      ),
      switchMap(([{ receipt }, uploadUrlInfo]) => {
        const formModel = new FormData();
        formModel.append('receipt', receipt.image);
        return forkJoin(
          this.receiptService.create({ ...receipt, name: uploadUrlInfo.name }),
          this.receiptService.upload(uploadUrlInfo.uploadURL, receipt.image),
        );
      }),
      map(([receipt, upload]) => ReceiptActions.uploadReceiptSuccess()),
      catchError((error) => of(ReceiptActions.uploadReceiptFail({ error }))),
    ),
  );
}
