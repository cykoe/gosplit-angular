import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IPerson, IReceipt } from '../../../constants/models';
import * as fromGroup from '../../../group/state';
import * as fromReceipt from '../../state';
import * as receiptActions from '../../state/receipt.actions';

@Component({
  selector: 'app-receipt-list-container',
  templateUrl: './receipt-list-shell.component.html',
  styleUrls: ['./receipt-list-shell.component.scss'],
})
export class ReceiptListShellComponent implements OnInit {
  receipts$: Observable<IReceipt[]>;
  people$: Observable<IPerson[]>;

  constructor(
    private store: Store<fromReceipt.State>,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(receiptActions.listReceipt());
    this.receipts$ = this.store.pipe(select(fromReceipt.getReceipts));
    this.people$ = this.store.pipe(select(fromGroup.getPeople));
  }

  receiptSelected(receipt: IReceipt): void {
    this.store.dispatch(receiptActions.setCurrentReceiptId({receipt}));
    this.router.navigate(['receipts/items']);
  }

  deleteReceipt(receipt: IReceipt): void {
    this.store.dispatch(receiptActions.deleteReceipt({receipt}));
  }
}
