import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IGroup } from '../../../../constants/models';
import { InvoiceService } from '../../../invoice/invoice.service';
import { createGroup, deleteGroup, listGroup, setCurrentGroupId, updateGroup } from '../../store/group.actions';
import * as fromGroup from '../../store/group.state';

@Component({
  selector: 'app-group-list-shell',
  templateUrl: './group-list-shell.component.html',
  styleUrls: ['./group-list-shell.component.scss'],
})
export class GroupListShellComponent implements OnInit {
  groups$: Observable<IGroup[]>;

  constructor(
    private receiptService: InvoiceService,
    private store: Store<fromGroup.State>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(listGroup());
    this.groups$ = this.store.pipe(select(fromGroup.selectAllGroups));
  }

  createGroup(group: IGroup) {
    this.store.dispatch(createGroup({group}));
  }

  updateGroup(group: IGroup) {
    this.store.dispatch(updateGroup({group}));
  }

  deleteGroup(group: IGroup) {
    this.store.dispatch(deleteGroup({group}));
  }

  selectGroup(group: IGroup) {
    this.store.dispatch(setCurrentGroupId({group}));
  }
}
