import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { IPerson } from '../../constants/models';
import { GroupService } from '../group.service';
import * as GroupActions from './group.actions';
import * as PersonActions from './person.actions';

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
        map((group) => {
          console.log({group});
          return GroupActions.deleteGroupSuccess({id: 'no'});
        }),
        catchError((error) => of(GroupActions.deleteGroupFail({error}))),
      ),
    ),
  ));

  listGroups$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.listGroup.type),
    mergeMap(() => this.groupService.listGroups()
      .pipe(
        switchMap((groups) => {
          const actions = [];
          groups.forEach((g) => {
            g.people.forEach((person) => {
              actions.push(PersonActions.createPerson({person: {name: person, id: person, groupId: g.id}}));
            });
          });
          actions.push(GroupActions.listGroupSuccess({groups}));
          return actions;
        }),
        catchError((error) => of(GroupActions.listGroupFail({error}))),
      ),
    ),
  ));
}
