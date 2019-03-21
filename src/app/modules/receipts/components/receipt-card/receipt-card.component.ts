import { Component, OnInit } from '@angular/core';

import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-receipt-card',
  templateUrl: './receipt-card.component.html',
  styleUrls: ['./receipt-card.component.scss'],
})
export class ReceiptCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
