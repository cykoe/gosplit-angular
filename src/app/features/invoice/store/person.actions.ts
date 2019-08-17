import { createAction, props } from '@ngrx/store';
import { IPerson } from '../../../constants/models';

export const createPerson = createAction('[Person] Create Person', props<{ person: IPerson }>());
export const updatePerson = createAction('[Person] Update Person', props<{ person: IPerson }>());
export const updatePeople = createAction('[Person] Update People', props<{ people: IPerson[] }>());
export const deletePerson = createAction('[Person] Delete Person', props<{ id: string }>());
export const listPerson = createAction('[Person] List Person', props<{people: IPerson[]}>());

// TODO: these two are for updating splits
export const updatePeopleSplit = createAction('[Person] Update People Split');
export const updatePeopleSuccess = createAction('[Person] Update People Success', props<{ people: IPerson[] }>());
