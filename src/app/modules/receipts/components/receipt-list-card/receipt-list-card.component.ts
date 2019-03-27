import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../../../configs/app.config';

import { Receipt } from '../../shared/receipt.model';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-receipt-list-card',
  templateUrl: './receipt-list-card.component.html',
  styleUrls: ['./receipt-list-card.component.scss'],
})
export class ReceiptListCardComponent implements OnInit {
  @Input() element: Receipt;
  @Output() deleted = new EventEmitter<Receipt>();

  constructor(
    private router: Router,
    private receiptService: ReceiptService,
  ) {
  }

  ngOnInit() {
  }

  read(receipt: Receipt) {
    this.router.navigate([`/${AppConfig.routes.receipts}/${receipt.toUrlDate()}/${receipt.store}/${receipt.id}`]);
  }

  delete(receipt: Receipt) {
    this.receiptService.delete(receipt).subscribe(() => {
      this.deleted.emit(receipt);
    });
  }
}
