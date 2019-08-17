import { createAction, props } from '@ngrx/store';
import { IError, IGroup, IItem, IPerson, IReceipt, UploadUrlInfo } from '../../constants/models';

export const setCurrentReceiptId = createAction('[Receipt] Set Current Receipt', props<{ receipt: IReceipt }>());
export const createReceipt = createAction('[Receipt] Create', props<{receipt: IReceipt}>());
export const createReceiptSuccess = createAction('[Receipt] Create Receipt Success', props<{ receipt: IReceipt }>());
export const createReceiptFail = createAction('[Receipt] Create Receipt Fail', props<{ error: IError }>());
export const readReceipt = createAction('[Receipt] Read Receipt', props<{ receipt: IReceipt }>());
export const readReceiptSuccess = createAction('[Receipt] Read Receipt Success', props<{ receipt: IReceipt }>());
export const readReceiptFail = createAction('[Receipt] Read Receipt Fail', props<{ error: IError }>());
export const updateReceipt = createAction('[Receipt] Update Receipt', props<{receipt: IReceipt}>());
export const updateReceiptSuccess = createAction('[Receipt] Update Receipt Success', props<{ receipt: IReceipt }>());
export const updateReceiptFail = createAction('[Receipt] Update Receipt Fail', props<{ error: IError }>());
export const deleteReceipt = createAction('[Receipt] Delete Receipt', props<{ receipt: IReceipt }>());
export const deleteReceiptSuccess = createAction('[Receipt] Delete Receipt Success', props<{ id: string }>());
export const deleteReceiptFail = createAction('[Receipt] Delete Receipt Fail', props<{ error: IError }>());
export const listReceipt = createAction('[Receipt] List Receipt');
export const listReceiptSuccess = createAction('[Receipt] List Receipt Success', props<{ receipts: IReceipt[] }>());
export const listReceiptFail = createAction('[Receipt] List Receipt Fail', props<{ error: IError }>());
export const createItem = createAction('[Item] Create Item', props<{ item: IItem, receiptId: string }>());
export const updateItem = createAction('[Item] Update Item', props<{ item: IItem, receiptId: string }>());
export const deleteItem = createAction('[Item] Delete Item', props<{ item: IItem, receiptId: string }>());
export const toggleSelection = createAction('[Selection] Toggle Selection',
  props<{ person: IPerson, item: IItem, index: number, receiptId: string }>());
export const toggleAllSelection = createAction('[Selection] Toggle All Selection',
  props<{ item: IItem, index: number, receiptId: string }>());
export const uploadReceipt = createAction('[Receipt] Upload Receipt', props<{receipt: Partial<IReceipt>}>());
export const uploadReceiptSuccess = createAction('[Receipt] Upload Receipt Success', props());
export const uploadReceiptFail = createAction('[Receipt] Upload Receipt Fail', props<{ error: IError }>());

// TODO: remove to a shared module
export const listGroup = createAction('[Group] List Group');
export const listGroupSuccess = createAction('[Group] List Group Success', props<{ groups: IGroup[] }>());
export const listGroupFail = createAction('[Group] List Group Fail', props<{ error: IError }>());
