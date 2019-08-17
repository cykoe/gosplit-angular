import { createAction, props } from '@ngrx/store';
import { IItem, IPerson } from '../../constants/models';

// TODO: fix person structure
export const createPerson = createAction('[Person] Create Person', props<{ person: IPerson }>());
export const updatePerson = createAction('[Person] Update Person', props<{ person: IPerson }>());
export const updatePeople = createAction('[Person] Update People', props<{ people: IPerson[] }>());
export const updatePeopleSplit = createAction('[Person] Update People Split');
export const updatePeopleSuccess = createAction('[Person] Update People Success', props<{ people: IPerson[] }>());
// export addItemId = createAction('[Person] Add Item Id');
export const deletePerson = createAction('[Person] Delete Person', props<{ id: string }>());
export const listPerson = createAction('[Person] List Person', props<{people: IPerson[]}>());

export const toggleSelection = createAction('[Selection] Toggle Selection',
  props<{ person: IPerson, item: IItem, index: number, receiptId: string }>());

export const toggleAllSelection = createAction('[Selection] Toggle All Selection',
  props<{ item: IItem, index: number, receiptId: string }>());
