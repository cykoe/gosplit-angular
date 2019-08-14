import { Action, createReducer, on } from '@ngrx/store';
import { IError, IGroup } from '../../constants/models';
import * as GroupActions from './group.actions';

export interface GroupState {
  currentGroupId: string | null;
  groups: IGroup[];
  error: IError;
}

export const initState: GroupState = {
  currentGroupId: null,
  groups: [],
  error: {message: ''},
};

export const groupReducer = createReducer(
  initState,
  on(GroupActions.createGroupSuccess, (state, {group}) => {
    return {
      ...state,
      groups: [...state.groups, group],
    };
  }),
  on(GroupActions.createGroupFail, (state, {error}) => {
    return {
      ...state,
      error,
    };
  }),
  on(GroupActions.deleteGroupSuccess, (state, {id}) => {
    return {
      ...state,
    };
  }),
  on(GroupActions.deleteGroupFail, (state, {error}) => {
    return {
      ...state,
      error,
    };
  }),
  on(GroupActions.listGroupSuccess, (state, {groups}) => {
    return {
      ...state,
      groups,
    };
  }),
  on(GroupActions.listGroupFail, (state, {error}) => {
    return {
      ...state,
      error,
    };
  }),
  on(GroupActions.setCurrentGroup, (state, {group}) => ({...state, currentGroupId: group.id})),
);

export function reducer(state: GroupState | undefined, action: Action) {
  return groupReducer(state, action);
}

export const groupFeatureKey = 'group';
