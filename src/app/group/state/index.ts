import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromGroups from './group.reducer';

export interface State extends fromRoot.State {
  groups: fromGroups.GroupState;
}

const getGroupFeatureState = createFeatureSelector<fromGroups.GroupState>(fromGroups.groupFeatureKey);

export const getGroups = createSelector(
  getGroupFeatureState,
  (state) => state.groups,
);

export const getCurrentGroupId = createSelector(
  getGroupFeatureState,
  (state) => state.currentGroupId,
);

export const getError = createSelector(
  getGroupFeatureState,
  (state) => state.error,
);

export const getCurrentGroup = createSelector(
  getGroupFeatureState,
  getCurrentGroupId,
  (state, currentGroupId) => currentGroupId ? state.groups.find((g) => g.id === currentGroupId) : null,
);
