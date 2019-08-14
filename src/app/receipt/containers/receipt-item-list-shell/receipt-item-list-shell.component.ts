import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromReceipt from '../../state';
import { IItem, IPerson, IReceipt } from '../../../constants/models';
import * as receiptActions from '../../state/receipt.actions';

@Component({
  selector: 'app-receipt-item-list',
  templateUrl: './receipt-item-list-shell.component.html',
  styleUrls: ['./receipt-item-list-shell.component.scss'],
})
export class ReceiptItemListShellComponent implements OnInit {
  selectedReceipt$: Observable<IReceipt>;

  constructor(
    private store: Store<fromReceipt.State>,
  ) {
  }

  ngOnInit(): void {
    this.selectedReceipt$ = this.store.pipe(select(fromReceipt.getCurrentReceipt));
  }

  createItem($event: { item: IItem; receiptId: string }): void {
    this.store.dispatch(receiptActions.createItem($event));
  }

  updateItem($event: { item: IItem; receiptId: string }): void {
    this.store.dispatch(receiptActions.updateItem($event));
  }

  deleteItem($event: { item: IItem; receiptId: string }): void {
    const {item, receiptId} = $event;
    this.store.dispatch(receiptActions.deleteItem({item, receiptId}));
  }

  toggleItem($event: { person: IPerson; item: IItem; index: number; receiptId: string }) {
    this.store.dispatch(receiptActions.toggleSelection($event));
  }

  toggleAllItems($event: { item: IItem; index: number; receiptId: string }) {
    this.store.dispatch(receiptActions.toggleAllSelection($event));
  }

  updateReceipt(): void {
    this.store.dispatch(receiptActions.updateReceipt());
  }
}
