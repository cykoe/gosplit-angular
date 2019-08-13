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
  on(ReceiptActions.listReceiptSuccess, (state, {receipts}) => ({...state, receipts})),
  on(ReceiptActions.listReceiptFail, (state, action) => ({...state, error: action})),
  on(ReceiptActions.createItem, (state, {item, receiptId}) => {
    const updatedReceipts = state.receipts.map(
      (receipt) => receiptId === receipt.id
        ? {...receipt, list: receipt.list.concat(item)}
        : receipt);
    return {
      ...state,
      receipts: updatedReceipts,
    };
  }),
  on(ReceiptActions.updateItem, (state, {item, receiptId}) => {
    const updatedReceipts = state.receipts.map(
      (receipt) => receiptId === receipt.id
        ? {...receipt, list: receipt.list.map((i) => i.id === item.id ? item : i)}
        : receipt);
    return {
      ...state,
      receipts: updatedReceipts,
    };
  }),
  on(ReceiptActions.deleteItem, (state, {item, receiptId}) => {
    const updatedReceipts = state.receipts.map(
      (receipt) => receiptId === receipt.id
        ? {...receipt, list: receipt.list.filter((i) => i.id !== item.id)}
        : receipt);
    return {
      ...state,
      receipts: updatedReceipts,
    };
  }),
  on(ReceiptActions.toggleSelection, (state, {person, item, index, receiptId}) => {
    let updatedPeople;

    if (!person.selection) {
      const length = item.people.filter((p) => p.selection).length + 1;
      const newItemSplit = item.price / length;
      if (length !== 1) {
        const oldItemSplit = item.price / (length - 1);
        updatedPeople = item.people.map((p) => {
            if (p.name !== person.name && p.selection) {
              return {...p, price: p.price - (oldItemSplit - newItemSplit)};
            } else if (p.name === person.name) {
              return {...p, price: p.price + newItemSplit, selection: true};
            } else {
              return {...p};
            }
          },
        );
      }
    } else {
      const length = item.people.filter((p) => p.selection).length;
      const oldItemSplit = item.price / length;
      if (length !== 1) {
        const newItemSplit = item.price / (length - 1);
        updatedPeople = item.people.map((p) => {
            if (p.name !== person.name && p.selection) {
              return {...p, price: p.price + newItemSplit - oldItemSplit};
            } else if (p.name === person.name) {
              return {...p, price: p.price - oldItemSplit, selection: false};
            } else {
              return {...p};
            }
          },
        );
      }
    }

    let oldPeople;

    const updatedReceipts = state.receipts.map(
      (receipt) => receiptId === receipt.id
        ? {
          ...receipt,
          list: receipt.list.map(
            (it, ind) => {
              if (ind === index) {
                oldPeople = it.people;
                return {...it, people: updatedPeople};
              } else {
                return {...it};
              }
            }),
          people: receipt.people.map(
            (p, i) => ({...p, price: p.price - oldPeople[i].price + updatedPeople[i].price}
            )),
        }
        : {...receipt});

    return {
      ...state,
      receipts: updatedReceipts,
    };
  }),
  on(ReceiptActions.toggleAllSelection, (state, {selection, item, index, receiptId}) => {
    const updatedPeople = item.people.map(
      (person) => ({
        ...person,
        price: selection
          ? 0
          : item.price / item.people.length,
        selection,
      }),
    );

    let oldPeople;

    const updatedReceipt = state.receipts.map(
      (receipt) => receiptId === receipt.id
        ? {
          ...receipt,
          list: receipt.list.map(
            (it, ind) => {
              if (ind === index) {
                oldPeople = it.people;
                return {...it, people: updatedPeople};
              } else {
                return {...it};
              }
            },
          ),
          people: receipt.people.map(
            (p, i) => ({...p, price: p.price - oldPeople[i].price + updatedPeople[i].price}
            )),
        }
        : {...receipt},
    );
    return {
      ...state,
      receipts: updatedReceipt,
    };
  }),
);

export function reducer(state: ReceiptState | undefined, action: Action) {
  return receiptReducer(state, action);
}

export const scoreboardFeatureKey = 'receipt';
