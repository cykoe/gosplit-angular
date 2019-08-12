import { createAction, props } from '@ngrx/store';
import { Item, Person, Receipt } from '../shared/receipt.model';
import { IError, IReceipt, IItem, IPerson } from './models';

export const setCurrentReceipt = createAction('[Receipt] Set Current Receipt', props<{receipt: IReceipt}>());
export const createReceipt = createAction('[Receipt] Create', props<IReceipt>());
export const createReceiptSuccess = createAction('[Receipt] Create Receipt Success', props<IReceipt>());
export const createReceiptFail = createAction('[Receipt] Create Receipt Fail', props<IError>());
export const readReceipt = createAction('[Receipt] Read Receipt', props<IReceipt>());
export const readReceiptSuccess = createAction('[Receipt] Read Receipt Success', props<IReceipt>());
export const readReceiptFail = createAction('[Receipt] Read Receipt Fail', props<IError>());
export const updateReceipt = createAction('[Receipt] Update Receipt', props<IReceipt>());
export const updateReceiptSuccess = createAction('[Receipt] Update Receipt Success', props<IReceipt>());
export const updateReceiptFail = createAction('[Receipt] Update Receipt Fail', props<IError>());
export const deleteReceipt = createAction('[Receipt] Delete Receipt', props<{receipt: IReceipt}>());
export const deleteReceiptSuccess = createAction('[Receipt] Delete Receipt Success', props<{id: string}>());
export const deleteReceiptFail = createAction('[Receipt] Delete Receipt Fail', props<IError>());
export const listReceipt = createAction('[Receipt] List Receipt', props<{groupId: string}>());
export const listReceiptSuccess = createAction('[Receipt] List Receipt Success', props<{receipts: IReceipt[]}>());
export const listReceiptFail = createAction('[Receipt] List Receipt Fail', props<IError>());
export const createItem = createAction('[Item] Create Item', props<{item: IItem, receiptId: string}>());
export const updateItem = createAction('[Item] Update Item', props<{item: IItem, receiptId: string}>());
export const deleteItem = createAction('[Item] Delete Item', props<{item: IItem, receiptId: string}>());
export const toggleSelection = createAction('[Selection] Toggle Selection', props<{person: IPerson, item: IItem, index: number, receiptId: string}>());

