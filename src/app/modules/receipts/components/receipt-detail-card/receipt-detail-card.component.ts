import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../shared/item.model';

@Component({
  selector: 'app-receipt-detail-card',
  templateUrl: './receipt-detail-card.component.html',
  styleUrls: ['./receipt-detail-card.component.scss'],
})
export class ReceiptDetailCardComponent implements OnInit {
  @Input() item: Item;
  @Output() readonly removed = new EventEmitter<Item>();

  constructor() { }

  ngOnInit() {
  }

  remove(item: Item) {
    this.removed.emit(item);
  }

}
