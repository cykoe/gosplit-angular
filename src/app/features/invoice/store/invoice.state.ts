import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../../../core/core.state';
import { ItemState, PersonState, ReceiptState } from './models';

import * as fromItems from './item.reducer';
import * as fromPeople from './person.reducer';
import * as fromReceipts from './receipt.reducer';

export const FEATURE_NAME = 'invoices';

const selectInvoiceState = createFeatureSelector<State, InvoiceState>(FEATURE_NAME);

const selectReceiptState = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.receipts,
);

const selectPersonState = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.people,
);

const selectItemState = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.items,
);

export const selectAllReceipts = createSelector(
  selectReceiptState,
  fromReceipts.selectAll,
);

export const selectCurrentReceiptId = createSelector(
  selectReceiptState,
  (state: ReceiptState): string => state.selectReceiptId,
);

export const selectAllItems = createSelector(
  selectItemState,
  fromItems.selectAll,
);

export const selectEntitiesReceipts = createSelector(
  selectReceiptState,
  fromReceipts.selectEntities,
);

export const selectCurrentReceipt = createSelector(
  selectEntitiesReceipts,
  selectCurrentReceiptId,
  (userEntities, receiptId) => userEntities[receiptId],
);

export const selectAllPeople = createSelector(
  selectPersonState,
  fromPeople.selectAll,
);

export const selectReceiptIsLoading = createSelector(
  selectReceiptState,
  (state: ReceiptState): boolean => state.isLoading,
);

export const selectReceiptError = createSelector(
  selectReceiptState,
  (state: ReceiptState): any => state.error,
);

export const reducers: ActionReducerMap<InvoiceState> = {
  receipts: fromReceipts.reducer,
  people: fromPeople.reducer,
  items: fromItems.reducer,
};

export interface InvoiceState {
  receipts: ReceiptState;
  people: PersonState;
  items: ItemState;
}

export interface State extends AppState {
  invoices: InvoiceState;
}
