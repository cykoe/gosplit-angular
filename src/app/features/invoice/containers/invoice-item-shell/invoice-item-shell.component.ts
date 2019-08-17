import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromInvoice from '../../store/invoice.state';
import * as itemActions from '../../store/item.actions';
import { IItem, IPerson, IReceipt } from '../../store/models';
import * as personActions from '../../store/person.actions';
import * as receiptActions from '../../store/receipt.actions';

@Component({
  selector: 'app-receipt-item-list',
  templateUrl: './invoice-item-shell.component.html',
  styleUrls: ['./invoice-item-shell.component.scss'],
})
export class InvoiceItemShellComponent implements OnInit {
  selectedReceipt$: Observable<IReceipt>;
  people$: Observable<IPerson[]>;
  items$: Observable<IItem[]>;

  constructor(
    private store: Store<fromInvoice.State>,
  ) {
  }

  ngOnInit(): void {
    this.selectedReceipt$ = this.store.pipe(select(fromInvoice.selectCurrentReceipt));
    this.items$ = this.store.pipe(select(fromInvoice.selectAllItems));
    this.people$ = this.store.pipe(select(fromInvoice.selectAllPeople));
  }

  createItem($event: { item: IItem; receiptId: string }): void {
    this.store.dispatch(itemActions.createItem($event));
  }

  updateItem($event: { item: IItem; receiptId: string }): void {
    this.store.dispatch(itemActions.updateItem($event));
  }

  deleteItem($event: { item: IItem; receiptId: string }): void {
    const {item, receiptId} = $event;
    this.store.dispatch(itemActions.deleteItem({id: item.id}));
  }

  toggleItem($event: { person: IPerson; item: IItem; index: number; receiptId: string }) {
    this.store.dispatch(itemActions.updateItem({item: $event.item}));
    this.store.dispatch(personActions.updatePeopleSplit());
  }

  updateReceipt(receipt: IReceipt): void {
    this.store.dispatch(receiptActions.updateReceipt({receipt}));
  }
}
