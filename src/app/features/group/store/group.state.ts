import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../../../core/core.state';
import { GroupState } from './group.model';
import * as fromGroups from './group.reducer';
export * from './group.actions';

export const FEATURE_NAME = 'groups';

const getGroupFeatureState = createFeatureSelector<AppState, GroupState>(FEATURE_NAME);

export const selectAllGroups = createSelector(
  getGroupFeatureState,
  fromGroups.selectAll,
);

export const selectEntitiesGroups = createSelector(
  getGroupFeatureState,
  fromGroups.selectEntities,
);

export const selectCurrentGroupId = createSelector(
  getGroupFeatureState,
  (state: GroupState): string => state.selectGroupId,
);

export const selectGroupIsLoading = createSelector(
  getGroupFeatureState,
  (state: GroupState): boolean => state.isLoading,
);

export const selectGroupError = createSelector(
  getGroupFeatureState,
  (state: GroupState): any => state.error,
);

export const selectCurrentGroup = createSelector(
  selectEntitiesGroups,
  selectCurrentGroupId,
  (userEntities, groupId) => userEntities[groupId],
);
