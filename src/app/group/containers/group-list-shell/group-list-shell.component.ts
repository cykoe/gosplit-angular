import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromGroup from '../../state';
import * as groupActions from '../../state/group.actions';

import { ReceiptService } from '../../../receipt/receipt.service';
import { Group } from '../../../receipt/shared/group.model';
import * as fromReceipt from '../../../receipt/state';
import { IGroup } from '../../../constants/models';

@Component({
  selector: 'app-group-list-shell',
  templateUrl: './group-list-shell.component.html',
  styleUrls: ['./group-list-shell.component.scss'],
})
export class GroupListShellComponent implements OnInit {
  groups: Group[];
  groups$: Observable<IGroup[]>;

  constructor(
    private receiptService: ReceiptService,
    private store: Store<fromReceipt.State>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(groupActions.listGroup());
    this.groups$ = this.store.pipe(select(fromGroup.getGroups));
    this.receiptService.listGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
    });
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
