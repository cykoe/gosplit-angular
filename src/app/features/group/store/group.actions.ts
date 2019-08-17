import { createAction, props } from '@ngrx/store';
import { IGroup } from '../../../constants/models';

export const setCurrentGroupId = createAction('[Group] Set Current Group', props<{ group: IGroup }>());
// create
export const createGroup = createAction('[Group] Create Group', props<{ group: IGroup }>());
export const createGroupSuccess = createAction('[Group] Create Group Success', props<{ group: IGroup }>());
export const createGroupFail = createAction('[Group] Create Group Fail', props<{ error: any }>());
// update
export const updateGroup = createAction('[Group] Update Group', props<{ group: IGroup }>());
export const updateGroupSuccess = createAction('[Group] Update Group Success', props<{ group: IGroup }>());
export const updateGroupFail = createAction('[Group] Update Group Fail', props<{ error: any }>());
// delete
export const deleteGroup = createAction('[Group] Delete Group', props<{ group: IGroup }>());
export const deleteGroupSuccess = createAction('[Group] Delete Group Success', props<{ id: string }>());
export const deleteGroupFail = createAction('[Group] Delete Group Fail', props<{ error: any }>());
// list
export const listGroup = createAction('[Group] List Group');
export const listGroupSuccess = createAction('[Group] List Group Success', props<{ groups: IGroup[] }>());
export const listGroupFail = createAction('[Group] List Group Fail', props<{ error: any }>());
