import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ReceiptApiService } from '../../core/services/receipt-api.service';
import { Receipt } from '../../shared/models/receipt';

import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'Charlie', 'Xinghan', 'Lawrence', 'Mohan', 'Haowei'];
  receipts$: Observable<Receipt[]>;
  dataSource;
  totalCost = [0, 0, 0, 0, 0];

  constructor(
    private receiptApiService: ReceiptApiService,
    private router: Router,
    private auth: AuthService,
  ) {
  }

  ngOnInit() {
    this.receipts$ = this.receiptApiService.list();
    this.receipts$.subscribe((receipts) => {
      receipts.sort((val1, val2) => +new Date(val2.date) - +new
      Date(val1.date));
      this.dataSource = new MatTableDataSource<Receipt>(receipts);
      this.totalCost = receipts.map((t) => t.split).reduce((acc, value) => acc.map((p, i) => p + value[i]), [0, 0, 0, 0, 0]);
    });
  }

  gotoReceipt(row) {
    if (!!this.auth.token) {
      this.router.navigate([`/library/${row.id}`]);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalCost = this.dataSource.filteredData.map(
      (t) => t.split).reduce((acc, value) => acc.map((p, i) => p + value[i]), [0, 0, 0, 0, 0]);
  }

}
