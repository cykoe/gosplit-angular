import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../app.state';
import * as fromReceipts from './receipt.reducer';

export interface State extends fromRoot.State {
  receipts: fromReceipts.ReceiptState;
}

const getReceiptFeatureState = createFeatureSelector<fromReceipts.ReceiptState>(fromReceipts.receiptFeatureKey);

export const getReceipts = createSelector(
  getReceiptFeatureState,
  (state) => state.receipts,
);

export const getCurrentReceiptId = createSelector(
  getReceiptFeatureState,
  (state) => state.currentReceiptId,
);

export const getGroups = createSelector(
  getReceiptFeatureState,
  (state) => state.groups,
);

export const getError = createSelector(
  getReceiptFeatureState,
  (state) => state.error,
);

export const getCurrentReceipt = createSelector(
  getReceiptFeatureState,
  getCurrentReceiptId,
  (state, currentReceiptId) => currentReceiptId ? state.receipts.find((r) => r.id === currentReceiptId) : null,
);
