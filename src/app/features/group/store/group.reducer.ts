import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as GroupActions from './group.actions';
import { GroupState, IGroup } from './group.model';

export const adapter: EntityAdapter<IGroup> = createEntityAdapter<IGroup>({
  sortComparer: (a: IGroup, b: IGroup): number => a.id.localeCompare(b.id),
});

export const initState: GroupState = adapter.getInitialState({
  selectGroupId: null,
  isLoading: false,
  error: null,
});

export const groupReducer = createReducer(
  initState,
  on(GroupActions.setCurrentGroupId, (state, {group}) => ({...state, selectGroupId: group.id})),
  // create
  on(GroupActions.createGroup, (state) => ({...state, isLoading: true, error: null})),
  on(GroupActions.createGroupSuccess, (state, {group}) => adapter.addOne(group, {...state, isLoading: false, error: null})),
  on(GroupActions.createGroupFail, (state, {error}) => ({...state, isLoading: false, error})),
  // update
  on(GroupActions.updateGroup, (state) => ({...state, isLoading: true, error: null})),
  on(GroupActions.updateGroupSuccess, (state, {group}) => adapter.upsertOne(group, {...state, isLoading: false, error: null})),
  on(GroupActions.updateGroupFail, (state, {error}) => ({...state, isLoading: false, error})),
  // delete
  on(GroupActions.deleteGroup, (state) => ({...state, isLoading: true, error: null})),
  on(GroupActions.deleteGroupSuccess, (state, {id}) => adapter.removeOne(id, {...state, isLoading: false, error: null})),
  on(GroupActions.deleteGroupFail, (state, {error}) => ({...state, isLoading: false, error})),
  // list
  on(GroupActions.listGroup, (state) => ({...state, isLoading: true, error: null})),
  on(GroupActions.listGroupSuccess, (state, {groups}) => adapter.addAll(groups, {...state, isLoading: false, error: null})),
  on(GroupActions.listGroupFail, (state, {error}) => ({...state, isLoading: false, error})),
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();

export function reducer(state: GroupState | undefined, action: Action) {
  return groupReducer(state, action);
}
