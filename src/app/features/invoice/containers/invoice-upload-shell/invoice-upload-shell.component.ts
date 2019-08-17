import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IGroup, IReceipt } from '../../../../constants/models';
import * as fromGroup from '../../../group/store/group.state';
import * as fromInvoice from '../../store/invoice.state';
import * as receiptActions from '../../store/receipt.actions';

@Component({
  selector: 'app-upload-shell',
  templateUrl: './invoice-upload-shell.component.html',
  styleUrls: ['./invoice-upload-shell.component.scss'],
})
export class InvoiceUploadShellComponent implements OnInit {
  groups$: Observable<any[]>;

  constructor(
    private store: Store<fromInvoice.State>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    // TODO: combine groups and invoices
    // this.store.dispatch(receiptActions.listGroup());
    this.groups$ = this.store.pipe(select(fromInvoice.selectAllReceipts));
  }

  submitReceipt(receipt: Partial<IReceipt>) {
    this.store.dispatch(receiptActions.uploadReceipt({receipt}));
    this.router.navigate(['receipts']);
  }
}
