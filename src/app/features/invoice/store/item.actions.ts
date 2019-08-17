import { createAction, props } from '@ngrx/store';
import { IItem } from '../../../constants/models';

export const createItem = createAction('[Item] Create Item', props<{ item: IItem }>());
export const updateItem = createAction('[Item] Update Item', props<{ item: IItem }>());
export const deleteItem = createAction('[Item] Delete Item', props<{ id: string }>());
export const listItem = createAction('[Item] List Item', props<{items: IItem[]}>());
export const addSplit = createAction('[Item] Add Split');
