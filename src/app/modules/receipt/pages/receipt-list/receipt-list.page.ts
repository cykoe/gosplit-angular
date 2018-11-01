import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Receipt } from '../../../../shared/models/receipt';
import { ReceiptApiService } from '../../../../core/services/receipt-api.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt-list.page.html',
  styleUrls: ['./receipt-list.page.sass']
})
export class ReceiptListPage implements OnInit {

  receipts$: Observable<Receipt[]>;

  constructor(
    private receiptApiService: ReceiptApiService
  ) {
  }

  ngOnInit() {
    this.receipts$ = this.receiptApiService.list();
  }

}
