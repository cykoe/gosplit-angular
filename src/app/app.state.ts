import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import * as fromGroups from './group/state/group.reducer';
import * as fromPeople from './group/state/person.reducer';

export interface State {
  group: fromGroups.GroupState;
  person: fromPeople.PersonState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  group: fromGroups.groupReducer,
  person: fromPeople.personReducer,
  router: routerReducer,
};
