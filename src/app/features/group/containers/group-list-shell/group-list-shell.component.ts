import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IGroup } from '../../store/group.model';

import * as fromRoot from '../../../../core/core.state';
import * as fromGroup from '../../store/group.state';

@Component({
  selector: 'app-group-list-shell',
  templateUrl: './group-list-shell.component.html',
  styleUrls: ['./group-list-shell.component.scss'],
})
export class GroupListShellComponent implements OnInit {
  groups$: Observable<IGroup[]>;

  constructor(
    private store: Store<fromRoot.AppState>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(fromGroup.listGroup());
    this.groups$ = this.store.pipe(select(fromGroup.selectAllGroups));
  }

  createGroup(group: IGroup) {
    this.store.dispatch(fromGroup.createGroup({group}));
  }

  updateGroup(group: IGroup) {
    this.store.dispatch(fromGroup.updateGroup({group}));
  }

  deleteGroup(group: IGroup) {
    this.store.dispatch(fromGroup.deleteGroup({group}));
  }

  selectGroup(group: IGroup) {
    this.store.dispatch(fromGroup.setCurrentGroupId({group}));
  }
}
