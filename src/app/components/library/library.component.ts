import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Receipt } from '../../models/receipt';
import { ReceiptApiService } from '../../services/receipt-api.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent implements OnInit {

  receipts$: Observable<Receipt[]>;

  constructor(
    private receiptApiService: ReceiptApiService
  ) {
  }

  ngOnInit() {
    this.receipts$ = this.receiptApiService.list();
  }

}
