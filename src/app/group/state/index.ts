import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPerson } from '../../constants/models';
import * as fromGroups from './group.reducer';
import * as fromPeople from './person.reducer';

const getGroupFeatureState = createFeatureSelector<fromGroups.GroupState>(fromGroups.groupFeatureKey);
const getPersonFeatureState = createFeatureSelector<fromPeople.PersonState>(fromPeople.personFeatureKey);

export const getAllPeople = createSelector(
  getPersonFeatureState,
  fromPeople.selectAll,
);

export const getGroups = createSelector(
  getGroupFeatureState,
  fromGroups.selectAll,
);

export const getCurrentGroupId = createSelector(
  getGroupFeatureState,
  fromGroups.getSelectGroupId,
);

export const getPeople = createSelector(
  getAllPeople,
  getCurrentGroupId,
  (people, groupId) => people.filter((p) => p.groupId === groupId),
);
// export const getError = createSelector(
//   getGroupFeatureState,
//   (state) => state.error,
// );

export const selectGroupEntities = createSelector(
  getGroupFeatureState,
  fromGroups.selectEntities,
);

export const getCurrentGroup = createSelector(
  selectGroupEntities,
  getCurrentGroupId,
  (userEntities, groupId) => userEntities[groupId],
);
