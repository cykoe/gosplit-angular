import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../../../configs/app.config';

import { Receipt } from '../../shared/receipt.model';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-receipt-card',
  templateUrl: './receipt-card.component.html',
  styleUrls: ['./receipt-card.component.scss'],
})
export class ReceiptCardComponent implements OnInit {
  @Input() element: Receipt;

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
    // TODO: Needs to refresh to show deletion
    this.receiptService.delete(receipt).subscribe(() => this.router.navigate([`/${AppConfig.routes.home}`]));
  }

}
