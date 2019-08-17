import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { IReceipt, ReceiptState } from './models';
import * as ReceiptActions from './receipt.actions';

export const adapter: EntityAdapter<IReceipt> = createEntityAdapter<IReceipt>({
  sortComparer: (a: IReceipt, b: IReceipt): number => +new Date(b.date) - +new Date(a.date),
});

export const initState: ReceiptState = adapter.getInitialState({
  selectReceiptId: null,
  isLoading: false,
  error: null,
});

export const receiptReducer = createReducer(
  initState,
  on(ReceiptActions.setCurrentReceiptId, (state, {receipt}) => ({...state, selectReceiptId: receipt.id})),
  // create
  on(ReceiptActions.createReceipt, (state) => ({...state, isLoading: true, error: null})),
  on(ReceiptActions.createReceiptSuccess, (state, {receipt}) => (adapter.addOne(receipt, {
    ...state,
    isLoading: false,
    error: null,
  }))),
  on(ReceiptActions.createReceiptFail, (state, {error}) => ({...state, isLoading: false, error})),
  // update
  on(ReceiptActions.updateReceipt, (state) => ({...state, isLoading: true, error: null})),
  on(ReceiptActions.updateReceiptSuccess, (state, {receipt}) => adapter.upsertOne(receipt, {
    ...state,
    isLoading: false,
    error: null,
  })),
  on(ReceiptActions.updateReceiptFail, (state, {error}) => ({...state, isLoading: false, error})),
  // delete
  on(ReceiptActions.deleteReceipt, (state) => ({...state, isLoading: true, error: null})),
  on(ReceiptActions.deleteReceiptSuccess, (state, {id}) => adapter.removeOne(id, {
    ...state,
    selectReceiptId: null,
    isLoading: false,
    error: null,
  })),
  on(ReceiptActions.deleteReceiptFail, (state, {error}) => ({...state, isLoading: false, error})),
  // list
  on(ReceiptActions.listReceipt, (state) => ({...state, isLoading: true, error: null})),
  on(ReceiptActions.listReceiptSuccess, (state, {receipts}) => (adapter.addAll(receipts, {
    ...state,
    isLoading: false,
    error: null,
  }))),
  on(ReceiptActions.listReceiptFail, (state, {error}) => ({...state, isLoading: false, error})),
  // upload
  on(ReceiptActions.uploadReceipt, (state) => ({...state, isLoading: true, error: null})),
  on(ReceiptActions.uploadReceiptSuccess, (state, action) => ({...state, isLoading: false, error: null})),
  on(ReceiptActions.uploadReceiptFail, (state, {error}) => ({...state, isLoading: false, error})),
);

export const getSelectReceiptId = (state: ReceiptState) => state.selectReceiptId;

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();

export function reducer(state: ReceiptState | undefined, action: Action) {
  return receiptReducer(state, action);
}
