import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromInvoice from '../../store/invoice.state';
import { IPerson, IReceipt } from '../../store/models';
import * as receiptActions from '../../store/receipt.actions';

@Component({
  selector: 'app-receipt-list-container',
  templateUrl: './invoice-table-shell.component.html',
  styleUrls: ['./invoice-table-shell.component.scss'],
})
export class InvoiceTableShellComponent implements OnInit {
  receipts$: Observable<IReceipt[]>;
  people$: Observable<IPerson[]>;

  constructor(
    private store: Store<fromInvoice.State>,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.receipts$ = this.store.pipe(select(fromInvoice.selectAllReceipts));
    this.people$ = this.store.pipe(select(fromInvoice.selectAllPeople));
  }

  receiptSelected(receipt: IReceipt): void {
    this.store.dispatch(receiptActions.setCurrentReceiptId({receipt}));
    this.router.navigate(['invoices/receipt', receipt.id]);
  }

  deleteReceipt(receipt: IReceipt): void {
    this.store.dispatch(receiptActions.deleteReceipt({receipt}));
  }
}
