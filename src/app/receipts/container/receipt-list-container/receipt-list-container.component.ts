import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromReceipt from '../../state';
import { IReceipt } from '../../state/models';
import * as receiptActions from '../../state/receipt.actions';

@Component({
  selector: 'app-receipt-list-container',
  templateUrl: './receipt-list-container.component.html',
  styleUrls: ['./receipt-list-container.component.scss'],
})
export class ReceiptListContainerComponent implements OnInit {
  receipts$: Observable<IReceipt[]>;
  selectedReceipt$: Observable<IReceipt>;

  constructor(
    private store: Store<fromReceipt.State>,
  ) { }

  ngOnInit() {
    this.store.dispatch(receiptActions.listReceipt({groupId: '5d4dcea461c38304963e2923'}));
    this.receipts$ = this.store.pipe(select(fromReceipt.getReceipts));
    this.selectedReceipt$ = this.store.pipe(select(fromReceipt.getCurrentReceipt));
  }

  receiptSelected(receipt: IReceipt): void {
    this.store.dispatch(receiptActions.setCurrentReceipt({receipt}));
  }

  deleteReceipt(receipt: IReceipt): void {
    this.store.dispatch(receiptActions.deleteReceipt({receipt}));
  }
}
