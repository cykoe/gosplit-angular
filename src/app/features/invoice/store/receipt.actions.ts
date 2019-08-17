import { createAction, props } from '@ngrx/store';
import { IReceipt} from './models';

export const setCurrentReceiptId = createAction('[Receipt] Set Current Receipt', props<{ receipt: IReceipt }>());
// create
export const createReceipt = createAction('[Receipt] Create', props<{receipt: IReceipt}>());
export const createReceiptSuccess = createAction('[Receipt] Create Receipt Success', props<{ receipt: IReceipt }>());
export const createReceiptFail = createAction('[Receipt] Create Receipt Fail', props<{ error: any }>());
// read
export const readReceipt = createAction('[Receipt] Read Receipt', props<{ receipt: IReceipt }>());
export const readReceiptSuccess = createAction('[Receipt] Read Receipt Success', props<{ receipt: IReceipt }>());
export const readReceiptFail = createAction('[Receipt] Read Receipt Fail', props<{ error: any }>());
// update
export const updateReceipt = createAction('[Receipt] Update Receipt', props<{receipt: IReceipt}>());
export const updateReceiptSuccess = createAction('[Receipt] Update Receipt Success', props<{ receipt: IReceipt }>());
export const updateReceiptFail = createAction('[Receipt] Update Receipt Fail', props<{ error: any }>());
// delete
export const deleteReceipt = createAction('[Receipt] Delete Receipt', props<{ receipt: IReceipt }>());
export const deleteReceiptSuccess = createAction('[Receipt] Delete Receipt Success', props<{ id: string }>());
export const deleteReceiptFail = createAction('[Receipt] Delete Receipt Fail', props<{ error: any }>());
// list
export const listReceipt = createAction('[Receipt] List Receipt');
export const listReceiptSuccess = createAction('[Receipt] List Receipt Success', props<{ receipts: IReceipt[] }>());
export const listReceiptFail = createAction('[Receipt] List Receipt Fail', props<{ error: any }>());
// upload
export const uploadReceipt = createAction('[Receipt] Upload Receipt', props<{receipt: Partial<IReceipt>}>());
export const uploadReceiptSuccess = createAction('[Receipt] Upload Receipt Success');
export const uploadReceiptFail = createAction('[Receipt] Upload Receipt Fail', props<{ error: any }>());
