import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IItem, IPerson, IReceipt } from '../../../constants/models';
import * as fromGroup from '../../../group/state';
import * as personActions from '../../../group/state/person.actions';
import * as fromReceipt from '../../state';
import * as itemActions from '../../state/item.actions';
import * as receiptActions from '../../state/receipt.actions';

@Component({
  selector: 'app-receipt-item-list',
  templateUrl: './receipt-item-list-shell.component.html',
  styleUrls: ['./receipt-item-list-shell.component.scss'],
})
export class ReceiptItemListShellComponent implements OnInit {
  selectedReceipt$: Observable<IReceipt>;
  people$: Observable<IPerson[]>;
  items$: Observable<IItem[]>;

  constructor(
    private store: Store<fromReceipt.State>,
  ) {
  }

  ngOnInit(): void {
    this.selectedReceipt$ = this.store.pipe(select(fromReceipt.getCurrentReceipt));
    this.items$ = this.store.pipe(select(fromReceipt.getItem));
    this.people$ = this.store.pipe(select(fromGroup.getPeople));
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
    this.store.dispatch(itemActions.updateItem({item: $event.item}));
    this.store.dispatch(personActions.updatePeopleSplit());
  }

  toggleAllItems($event: { item: IItem; index: number; receiptId: string }) {
    this.store.dispatch(receiptActions.toggleAllSelection($event));
  }

  updateReceipt(): void {
    this.selectedReceipt$.subscribe((receipt) => {
      this.store.dispatch(receiptActions.updateReceipt({receipt}));
    });
  }
}
