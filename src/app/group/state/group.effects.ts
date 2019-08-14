import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { GroupService } from '../group.service';
import * as GroupActions from './group.actions';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private groupService: GroupService,
  ) {
  }

  listGroups$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.listGroup.type),
    mergeMap(() => this.groupService.listGroups()
      .pipe(
        map((groups) => {
          return GroupActions.listGroupSuccess({groups});
        }),
        catchError((err) => {
          const error = {message: err.message};
          return of(GroupActions.listGroupFail({error}));
        }),
      ),
    ),
  ));

}
