import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromGroup from '../../state';
import * as groupActions from '../../state/group.actions';

import { IGroup } from '../../../constants/models';
import { ReceiptService } from '../../../receipt/receipt.service';
import * as fromReceipt from '../../../receipt/state';

@Component({
  selector: 'app-group-list-shell',
  templateUrl: './group-list-shell.component.html',
  styleUrls: ['./group-list-shell.component.scss'],
})
export class GroupListShellComponent implements OnInit {
  groups$: Observable<IGroup[]>;

  constructor(
    private receiptService: ReceiptService,
    private store: Store<fromReceipt.State>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(groupActions.listGroup());
    this.groups$ = this.store.pipe(select(fromGroup.getGroups));
  }

  createGroup(group: IGroup) {
    this.store.dispatch(groupActions.createGroup({group}));
  }

  updateGroup(group: IGroup) {
    this.store.dispatch(groupActions.updateGroup({group}));
  }

  deleteGroup(group: IGroup) {
    this.store.dispatch(groupActions.deleteGroup({group}));

  }
}
