import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromInvoice from '../../store/invoice.state';
import * as receiptActions from '../../store/receipt.actions';

@Component({
  selector: 'app-shell',
  templateUrl: './invoice-shell.component.html',
  styleUrls: ['./invoice-shell.component.scss'],
})
export class InvoiceShellComponent implements OnInit {

  constructor(
    private store: Store<fromInvoice.State>,
  ) { }

  ngOnInit() {
    this.store.dispatch(receiptActions.listReceipt());
  }

}
