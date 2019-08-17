import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IError, IReceipt } from '../../constants/models';
import * as ReceiptActions from './receipt.actions';

export interface ReceiptState extends EntityState<IReceipt> {
  selectReceiptId: string | null;
  error: IError;
}

export function sortByDate(a: IReceipt, b: IReceipt): number {
  return +new Date(b.date) - +new Date(a.date);
}

export const adapter: EntityAdapter<IReceipt> = createEntityAdapter<IReceipt>({
  sortComparer: sortByDate,
});

export const initState: ReceiptState = adapter.getInitialState({
  selectReceiptId: null,
  error: {message: ''},
});

export const receiptReducer = createReducer(
  initState,
  on(ReceiptActions.setCurrentReceiptId, (state, {receipt}) => ({...state, selectReceiptId: receipt.id})),
  on(ReceiptActions.createReceiptSuccess, (state, {receipt}) => (adapter.addOne(receipt, state))),
  on(ReceiptActions.createReceiptFail, (state, {error}) => ({...state, error})),
  on(ReceiptActions.updateReceiptSuccess, (state, {receipt}) => adapter.upsertOne(receipt, {
    ...state,
    selectReceiptId: receipt.id,
  })),
  on(ReceiptActions.updateReceiptFail, (state, {error}) => ({...state, error})),
  on(ReceiptActions.deleteReceiptSuccess, (state, {id}) => adapter.removeOne(id, {
    ...state,
    selectReceiptId: null,
  })),
  on(ReceiptActions.deleteReceiptFail, (state, {error}) => ({...state, error})),
  on(ReceiptActions.listReceiptSuccess, (state, {receipts}) => (adapter.addAll(receipts, state))),
  on(ReceiptActions.listReceiptFail, (state, {error}) => ({...state, error})),
  // on(ReceiptActions.toggleSelection, (state, {person, item, index, receiptId}) => {
  //   let updatedPeople;
  //
  //   if (!person.selection) {
  //     const length = item.people.filter((p) => p.selection).length + 1;
  //     const newItemSplit = item.price / length;
  //     const oldItemSplit = item.price / (length - 1);
  //     updatedPeople = item.people.map((p) => {
  //         if (p.name !== person.name && p.selection) {
  //           return {...p, price: p.price - (oldItemSplit - newItemSplit)};
  //         } else if (p.name === person.name) {
  //           return {...p, price: p.price + newItemSplit, selection: true};
  //         } else {
  //           return {...p};
  //         }
  //       },
  //     );
  //   } else {
  //     const length = item.people.filter((p) => p.selection).length;
  //     const oldItemSplit = item.price / length;
  //     const newItemSplit = item.price / (length - 1);
  //     updatedPeople = item.people.map((p) => {
  //         if (p.name !== person.name && p.selection) {
  //           return {...p, price: p.price + newItemSplit - oldItemSplit};
  //         } else if (p.name === person.name) {
  //           return {...p, price: p.price - oldItemSplit, selection: false};
  //         } else {
  //           return {...p};
  //         }
  //       },
  //     );
  //   }
  //
  //   let oldPeople;
  //
  //   const updatedReceipts = state.receipts.map(
  //     (receipt) => receiptId === receipt.id
  //       ? {
  //         ...receipt,
  //         list: receipt.list.map(
  //           (it, ind) => {
  //             if (ind === index) {
  //               oldPeople = it.people;
  //               return {...it, people: updatedPeople};
  //             } else {
  //               return {...it};
  //             }
  //           }),
  //         people: receipt.people.map(
  //           (p, i) => {
  //             return {...p, price: p.price - oldPeople[i].price + updatedPeople[i].price};
  //           }),
  //       }
  //       : {...receipt});
  //
  //   return {
  //     ...state,
  //     receipts: updatedReceipts,
  //   };
  // }),
  // on(ReceiptActions.toggleAllSelection, (state, {item, index, receiptId}) => {
  //   const selection = !item.people.every((p) => p.selection);
  //   const updatedPeople = item.people.map(
  //     (person) => ({
  //       ...person,
  //       price: selection
  //         ? item.price / item.people.length
  //         : 0,
  //       selection,
  //     }),
  //   );
  //
  //   let oldPeople;
  //
  //   const updatedReceipt = state.receipts.map(
  //     (receipt) => receiptId === receipt.id
  //       ? {
  //         ...receipt,
  //         list: receipt.list.map(
  //           (it, ind) => {
  //             if (ind === index) {
  //               oldPeople = it.people;
  //               return {...it, people: updatedPeople};
  //             } else {
  //               return {...it};
  //             }
  //           },
  //         ),
  //         people: receipt.people.map(
  //           (p, i) => ({...p, price: p.price - oldPeople[i].price + updatedPeople[i].price}
  //           )),
  //       }
  //       : {...receipt},
  //   );
  //   return {
  //     ...state,
  //     receipts: updatedReceipt,
  //   };
  // }),
  on(ReceiptActions.uploadReceiptSuccess, (state, action) => {
    console.log({action});
    return {
      ...state,
    };
  }),
  on(ReceiptActions.uploadReceiptFail, (state, action) => {
    console.log({action});
    return {
      ...state,
    };
  }),
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

export const receiptFeatureKey = 'receipt';
