import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { IError, IGroup } from '../../constants/models';
import * as GroupActions from './group.actions';

export interface GroupState extends EntityState<IGroup> {
  selectGroupId: string | null;
  error: IError;
}

export function sortById(a: IGroup, b: IGroup): number {
  return a.id.localeCompare(b.id);
}

export const adapter: EntityAdapter<IGroup> = createEntityAdapter<IGroup>({
  sortComparer: sortById,
});

export const initState: GroupState = adapter.getInitialState({
  selectGroupId: null,
  error: {message: ''},
});

export const groupReducer = createReducer(
  initState,
  on(GroupActions.createGroupSuccess, (state, {group}) => adapter.addOne(group, state)),
  on(GroupActions.createGroupFail, (state, {error}) => {
    return {
      ...state,
      error,
    };
  }),
  on(GroupActions.updateGroupSuccess, (state, {group}) => adapter.upsertOne(group, state)),
  on(GroupActions.updateGroupFail, (state, {error}) => {
    return {
      ...state,
      error,
    };
  }),
  on(GroupActions.deleteGroupSuccess, (state, {id}) => adapter.removeOne(id, state)),
  on(GroupActions.deleteGroupFail, (state, {error}) => {
    return {
      ...state,
      error,
    };
  }),
  on(GroupActions.listGroupSuccess, (state, {groups}) => adapter.addAll(groups, state)),
  on(GroupActions.listGroupFail, (state, {error}) => {
    return {
      ...state,
      error,
    };
  }),
  on(GroupActions.setCurrentGroup, (state, {group}) => ({...state, selectGroupId: group.id})),
);

export const getSelectGroupId = (state: GroupState) => {
  console.log({state});
  return state.selectGroupId;
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();

export function reducer(state: GroupState | undefined, action: Action) {
  return groupReducer(state, action);
}

export const groupFeatureKey = 'group';
