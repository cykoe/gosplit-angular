import { Action, createReducer, on } from '@ngrx/store';
import { IError, IReceipt } from './models';
import * as ReceiptActions from './receipt.actions';

export interface ReceiptState {
  currentReceiptId: string | null;
  receipts: IReceipt[];
  error: IError;
}

export const initState: ReceiptState = {
  currentReceiptId: null,
  receipts: [],
  error: {message: ''},
};

export const receiptReducer = createReducer(
  initState,
  on(ReceiptActions.setCurrentReceipt, (state, {receipt}) => ({...state, currentReceiptId: receipt.id})),
  on(ReceiptActions.createReceiptSuccess, (state, action) => ({...state, receipts: [...state.receipts, action]})),
  on(ReceiptActions.createReceiptFail, (state, action) => ({...state, error: action})),
  on(ReceiptActions.updateReceiptSuccess, (state, action) => {
    const updatedReceipts = state.receipts.map((receipt) => receipt.id === action.id ? action : receipt);
    return {...state, receipts: updatedReceipts, currentReceiptId: action.id};
  }),
  on(ReceiptActions.updateReceiptFail, (state, action) => ({...state, error: action})),
  on(ReceiptActions.deleteReceiptSuccess, (state, action) => {
    return {...state, receipts: state.receipts.filter((receipt) => receipt.id !== action.id), currentReceiptId: null};
  }),
  on(ReceiptActions.deleteReceiptFail, (state, action) => ({...state, error: action})),
  on(ReceiptActions.listReceiptSuccess, (state, {receipts}) => {
    console.log(receipts);
    return {...state, receipts};
  }),
  on(ReceiptActions.listReceiptFail, (state, action) => ({...state, error: action})),
  on(ReceiptActions.createItem, (state, {item, receiptId}) => {
    const updatedReceipts = state.receipts.map(
      (receipt) => receiptId === receipt.id ? receipt.list.concat(item) : receipt);
    return {
      ...state,
      receipts: updatedReceipts,
    };
  }),
  on(ReceiptActions.updateItem, (state, {item, receiptId}) => {
    const updatedReceipts = state.receipts.map(
      (receipt) => receiptId === receipt.id
        ? receipt.list.map((i) => i.id === item.id ? item : i)
        : receipt);
    return {
      ...state,
      receipts: updatedReceipts,
    };
  }),
  on(ReceiptActions.deleteItem, (state, {item, receiptId}) => {
    const updatedReceipts = state.receipts.map(
      (receipt) => receiptId === receipt.id
        ? receipt.list.filter((i) => i.id !== item.id)
        : receipt);
    return {
      ...state,
      receipts: updatedReceipts,
    };
  }),
  on(ReceiptActions.toggleSelection, (state, payload) => {
    console.log('toggle called!');
    console.log({payload});
    return {
      ...state,
    };
  }),
);

export function reducer(state: ReceiptState | undefined, action: Action) {
  return receiptReducer(state, action);
}

export const scoreboardFeatureKey = 'receipt';
