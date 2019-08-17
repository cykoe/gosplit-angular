import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromPerson from '../../group/state';
import * as fromReceipt from './index';

import * as PersonActions from '../../group/state/person.actions';
import { ReceiptService } from '../receipt.service';
import * as ItemActions from './item.actions';
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

  updateSplit$ = createEffect(() => this.actions$.pipe(
    ofType(PersonActions.updatePeopleSplit),
    withLatestFrom(
      this.store.pipe(select(fromReceipt.getItem)),
      this.store.pipe(select(fromPerson.getPeople)),
    ),
    mergeMap(([action, items, people]) => {
        people.forEach((p) => p.price = 0);
        items.forEach((item) => {
          const split = item.price / item.personIds.length;
          item.personIds.forEach((id) => {
            people.find((p) => p.name === id).price += split;
          });
        });
        return of(PersonActions.updatePeopleSuccess({people}));
      },
    ),
  ));

  updateReceipts$ = createEffect(() => this.actions$.pipe(
    ofType(ReceiptActions.updateReceipt),
    withLatestFrom(
      this.store.pipe(select(fromReceipt.getItem)),
      this.store.pipe(select(fromPerson.getPeople)),
      ),
    mergeMap(([{receipt}, items, people]) => {
      const newReceipt = {...receipt, list: items, people};
      console.log({newReceipt});
      return this.receiptService.update({...receipt, list: items, people})
          .pipe(
            map((receipt) => ReceiptActions.updateReceiptSuccess({receipt})),
            catchError((error) => of(ReceiptActions.updateReceiptFail({error}))),
          );
      },
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
    withLatestFrom(this.store.pipe(select(fromPerson.getCurrentGroupId))),
    mergeMap(([action, groupId]) => {
      console.log({groupId});
      return this.receiptService.list(groupId)
          .pipe(
            switchMap((receipts) => {
              const actions = [];
              receipts.forEach((receipt) => {
                receipt.list.forEach((item) => {
                  actions.push(ItemActions.createItem({item: {...item, receiptId: receipt.id}}));
                });
                // for newly generated receipt
                if (receipt.people && receipt.people[0]) {
                  const people = receipt.people.slice(0);
                  actions.push(PersonActions.updatePeople({people}));
                }
              });
              actions.push(ReceiptActions.listReceiptSuccess({receipts}));

              return actions;
            }),
            catchError((err) => {
              const error = {message: err.message};
              return of(ReceiptActions.listReceiptFail({error}));
            }),
          )
      },
    ),
  ));

  getUploadUrl$ = createEffect(() => this.actions$.pipe(
    ofType(ReceiptActions.uploadReceipt),
    switchMap((action) => forkJoin(of(action), this.receiptService.getUploadUrl())),
    switchMap(([{receipt}, uploadUrlInfo]) => {
      const formModel = new FormData();
      formModel.append('receipt', receipt.image);
      return forkJoin(
        this.receiptService.create({...receipt, name: uploadUrlInfo.name}),
        this.receiptService.upload(uploadUrlInfo.uploadURL, receipt.image));
    }),
    map(([receipt, upload]) => ReceiptActions.uploadReceiptSuccess(receipt)),
    catchError((error) => of(ReceiptActions.uploadReceiptFail({error}))),
    ),
  );

  // TODO: remove to a shared module
  // listGroups$ = createEffect(() => this.actions$.pipe(
  //   ofType(ReceiptActions.listGroup.type),
  //   mergeMap(() => this.groupService.listGroups()
  //     .pipe(
  //       map((groups) => ReceiptActions.listGroupSuccess({groups})),
  //       catchError((error) => of(ReceiptActions.listGroupFail({error}))),
  //     ),
  //   ),
  // ));
}
