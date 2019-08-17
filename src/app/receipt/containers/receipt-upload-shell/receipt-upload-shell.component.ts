import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IGroup, IReceipt } from '../../../constants/models';
import * as fromGroup from '../../../group/state';
import * as fromReceipt from '../../state/';
import * as receiptActions from '../../state/receipt.actions';

@Component({
  selector: 'app-upload-shell',
  templateUrl: './receipt-upload-shell.component.html',
  styleUrls: ['./receipt-upload-shell.component.scss'],
})
export class ReceiptUploadShellComponent implements OnInit {
  groups$: Observable<IGroup[]>;

  constructor(
    private store: Store<fromReceipt.State>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(receiptActions.listGroup());
    this.groups$ = this.store.pipe(select(fromGroup.getGroups));
  }

  submitReceipt(receipt: Partial<IReceipt>) {
    this.store.dispatch(receiptActions.uploadReceipt({receipt}));
    this.router.navigate(['receipts']);
  }
}
