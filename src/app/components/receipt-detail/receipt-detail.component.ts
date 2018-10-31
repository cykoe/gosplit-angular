import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Receipt } from '../../models/receipt';
import { ReceiptApiService } from '../../services/receipt-api.service';

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail.component.html',
  styleUrls: ['./receipt-detail.component.sass']
})
export class ReceiptDetailComponent implements OnInit {

  receipt$: Observable<Receipt>;

  constructor(
    private receiptApiService: ReceiptApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.receipt$ = this.route.paramMap.pipe(
      switchMap(params => this.receipt$ = this.receiptApiService.read(params.get('id')))
    );
  }

}
