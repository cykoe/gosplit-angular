import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IPerson } from '../../constants/models';
import * as PersonActions from './person.actions';

export interface PersonState extends EntityState<IPerson> {}

export const adapter: EntityAdapter<IPerson> = createEntityAdapter<IPerson>({});

export const initState: PersonState = adapter.getInitialState({});

export const personReducer = createReducer(
  initState,
  on(PersonActions.createPerson, (state, {person}) => adapter.addOne(person, state)),
  on(PersonActions.updatePerson, (state, {person}) => adapter.upsertOne(person, state)),
  on(PersonActions.deletePerson, (state, {id}) => adapter.removeOne(id, state)),
  on(PersonActions.listPerson, (state, {people}) => adapter.addAll(people, state)),
  on(PersonActions.updatePeopleSuccess, (state, {people}) => adapter.upsertMany(people, state)),
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();

export function reducer(state: PersonState | undefined, action: Action) {
  return personReducer(state, action);
}

export const personFeatureKey = 'person';
