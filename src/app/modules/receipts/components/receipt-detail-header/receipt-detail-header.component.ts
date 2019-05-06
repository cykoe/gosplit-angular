import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Receipt } from '../../shared/receipt.model';

@Component({
  selector: 'app-receipt-detail-header',
  templateUrl: './receipt-detail-header.component.html',
  styleUrls: ['./receipt-detail-header.component.scss'],
})
export class ReceiptDetailHeaderComponent {
  @Input() receipt: Receipt;
  @Output() selected = new EventEmitter<boolean>();

  autoSelect() {
    this.selected.emit(true);
  }
}
