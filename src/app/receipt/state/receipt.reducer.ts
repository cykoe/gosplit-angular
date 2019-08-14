import { Action, createReducer, on } from '@ngrx/store';
import { IError, IGroup, IReceipt } from '../../constants/models';
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
  on(ReceiptActions.createReceiptSuccess, (state, {receipt}) => ({...state, receipts: [...state.receipts, receipt]})),
  on(ReceiptActions.createReceiptFail, (state, {error}) => ({...state, error})),
  on(ReceiptActions.updateReceiptSuccess, (state, {receipt}) => {
    const updatedReceipts = state.receipts.map((r) => r.id === receipt.id ? receipt : r);
    return {...state, receipts: updatedReceipts, currentReceiptId: receipt.id};
  }),
  on(ReceiptActions.updateReceiptFail, (state, {error}) => ({...state, error})),
  on(ReceiptActions.deleteReceiptSuccess, (state, action) => {
    return {...state, receipts: state.receipts.filter((receipt) => receipt.id !== action.id), currentReceiptId: null};
  }),
  on(ReceiptActions.deleteReceiptFail, (state, {error}) => ({...state, error})),
  on(ReceiptActions.listReceiptSuccess, (state, {receipts}) => ({...state, receipts})),
  on(ReceiptActions.listReceiptFail, (state, {error}) => ({...state, error})),
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
    } else {
      const length = item.people.filter((p) => p.selection).length;
      const oldItemSplit = item.price / length;
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
            (p, i) => {
              console.log({p, i, updatedPeople, oldPeople});
              console.log(updatedPeople[i], oldPeople[i]);
              return {...p, price: p.price - oldPeople[i].price + updatedPeople[i].price};
            }),
        }
        : {...receipt});

    return {
      ...state,
      receipts: updatedReceipts,
    };
  }),
  on(ReceiptActions.toggleAllSelection, (state, {item, index, receiptId}) => {
    const selection = !item.people.every((p) => p.selection);
    const updatedPeople = item.people.map(
      (person) => ({
        ...person,
        price: selection
          ? item.price / item.people.length
          : 0,
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

export const receiptFeatureKey = 'receipt';
