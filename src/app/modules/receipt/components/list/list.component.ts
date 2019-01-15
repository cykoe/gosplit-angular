import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Observable } from 'rxjs';
import { Receipt } from '../../../../shared/models/receipt';
import { ReceiptApiService } from '../../../../core/services/receipt-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'Charlie', 'Xinghan', 'Lawrence', 'Mohan', 'Haowei'];
  receipts$: Observable<Receipt[]>;
  dataSource;
  totalCost = [0, 0, 0, 0, 0];

  constructor(
    private receiptApiService: ReceiptApiService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.receipts$ = this.receiptApiService.list();
    this.receipts$.subscribe(receipts => {
      receipts.sort((val1, val2) => +new Date(val2.date) - +new
      Date(val1.date));
      this.dataSource = new MatTableDataSource<Receipt>(receipts);
      this.totalCost = receipts.map(t => t.split).reduce((acc, value) => acc.map((p, i) => p + value[i]), [0, 0, 0, 0, 0]);
    });
  }

  gotoReceipt(row) {
    this.router.navigate([`/library/${row.id}`]);
  }

}
