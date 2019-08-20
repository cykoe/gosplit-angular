import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { GroupService } from '../group.service';
import * as GroupActions from './group.actions';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private groupService: GroupService,
  ) {
  }

  createGroups$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.createGroup),
    mergeMap((action) => this.groupService.createGroup(action.group)
      .pipe(
        map((group) => GroupActions.createGroupSuccess({group})),
        catchError((error) => of(GroupActions.createGroupFail({error}))),
      ),
    ),
  ));

  updateGroups$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.updateGroup),
    mergeMap((action) => this.groupService.updateGroup(action.group)
      .pipe(
        map((group) => GroupActions.updateGroupSuccess({group})),
        catchError((error) => of(GroupActions.updateGroupFail({error}))),
      ),
    ),
  ));

  deleteGroups$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.deleteGroup),
    mergeMap((action) => this.groupService.deleteGroup(action.group)
      .pipe(
        map((group) => GroupActions.deleteGroupSuccess({id: group.id})),
        catchError((error) => of(GroupActions.deleteGroupFail({error}))),
      ),
    ),
  ));

  listGroups$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.listGroup),
    mergeMap(() => this.groupService.listGroups()
      .pipe(
        map((groups) => GroupActions.listGroupSuccess({groups})),
        catchError((error) => of(GroupActions.listGroupFail({error}))),
      ),
    ),
  ));
}
