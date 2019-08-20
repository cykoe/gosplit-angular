import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IGroup } from '../../../group/store/group.model';
import * as fromGroup from '../../../group/store/group.state';
import * as fromInvoice from '../../store/invoice.state';
import { IReceipt } from '../../store/models';
import * as receiptActions from '../../store/receipt.actions';

@Component({
  selector: 'app-upload-shell',
  templateUrl: './invoice-upload-shell.component.html',
  styleUrls: ['./invoice-upload-shell.component.scss'],
})
export class InvoiceUploadShellComponent implements OnInit {
  group$: Observable<IGroup>;

  constructor(
    private store: Store<fromInvoice.State>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromGroup.listGroup());
    this.group$ = this.store.pipe(select(fromGroup.selectCurrentGroup));
  }

  submitReceipt(receipt: Partial<IReceipt>) {
    this.store.dispatch(receiptActions.uploadReceipt({receipt}));
    this.router.navigate(['receipts']);
  }
}
