import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../app.state';
import * as fromItems from './item.reducer';
import * as fromReceipts from './receipt.reducer';

export interface State extends fromRoot.State {
  receipt: fromReceipts.ReceiptState;
  item: fromItems.ItemState;
}

const getReceiptFeatureState = createFeatureSelector<
  fromReceipts.ReceiptState>(fromReceipts.receiptFeatureKey);
const getItemFeatureState = createFeatureSelector<
  fromItems.ItemState>(fromItems.itemFeatureKey);

export const getReceipts = createSelector(
  getReceiptFeatureState,
  fromReceipts.selectAll,
);

export const getCurrentReceiptId = createSelector(
  getReceiptFeatureState,
  fromReceipts.getSelectReceiptId,
);

export const getAllItem = createSelector(
  getItemFeatureState,
  fromItems.selectAll,
);

export const getItem = createSelector(
  getAllItem,
  getCurrentReceiptId,
  (items, receiptId) => items.filter(i => i.receiptId = receiptId),
);

export const selectReceiptEntities = createSelector(
  getReceiptFeatureState,
  fromReceipts.selectEntities,
);

export const getCurrentReceipt = createSelector(
  selectReceiptEntities,
  getCurrentReceiptId,
  (userEntities, receiptId) => userEntities[receiptId],
);
