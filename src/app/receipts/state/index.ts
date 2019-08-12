import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromReceipts from './receipt.reducer';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  receipts: fromReceipts.ReceiptState;
}

const getReceiptFeatureState = createFeatureSelector<fromReceipts.ReceiptState>('receipt');

export const getReceipts = createSelector(
  getReceiptFeatureState,
  (state) => state.receipts,
);

export const getCurrentReceiptId = createSelector(
  getReceiptFeatureState,
  (state) => state.currentReceiptId,
);

export const getCurrentReceipt = createSelector(
  getReceiptFeatureState,
  getCurrentReceiptId,
  (state, currentReceiptId) => currentReceiptId ? state.receipts.find((r) => r.id === currentReceiptId) : null,
);
