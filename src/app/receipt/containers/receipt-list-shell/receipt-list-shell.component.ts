import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromReceipt from '../../state';
import { IReceipt } from '../../../constants/models';
import * as receiptActions from '../../state/receipt.actions';

@Component({
  selector: 'app-receipt-list-container',
  templateUrl: './receipt-list-shell.component.html',
  styleUrls: ['./receipt-list-shell.component.scss'],
})
export class ReceiptListShellComponent implements OnInit {
  receipts$: Observable<IReceipt[]>;

  constructor(
    private store: Store<fromReceipt.State>,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(receiptActions.listReceipt({groupId: '5d4dcea461c38304963e2923'}));
    this.receipts$ = this.store.pipe(select(fromReceipt.getReceipts));
  }

  receiptSelected(receipt: IReceipt): void {
    this.store.dispatch(receiptActions.setCurrentReceipt({receipt}));
    this.router.navigate(['receipts/items']);
  }

  deleteReceipt(receipt: IReceipt): void {
    this.store.dispatch(receiptActions.deleteReceipt({receipt}));
  }
}
