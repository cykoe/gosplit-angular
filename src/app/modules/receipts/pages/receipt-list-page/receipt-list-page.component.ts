import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AppConfig } from '../../../../configs/app.config';
import { AuthService, HeaderService } from '../../../../core/services';
import { Receipt } from '../../shared/receipt.model';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt-list-page.component.html',
  styleUrls: ['./receipt-list-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReceiptListPageComponent implements OnInit {
  dataSource;
  displayedColumns: string[];
  totalFooter: number[];
  receipts: Receipt[];

  expandedElement;

  constructor(
    private auth: AuthService,
    private headerService: HeaderService,
    private receiptService: ReceiptService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.headerService.headerTabChange$.subscribe((tab) => {
      if (tab === 'Upload') {
        this.router.navigate([`/${AppConfig.routes.receipts}/${AppConfig.routes.upload}`]);
      } else if (tab === 'About') {
        this.router.navigate([`/${AppConfig.routes.accounts}/${AppConfig.routes.login}`]);
      }
    });
    this.displayedColumns = ['Date'];
    this.receiptService.list().subscribe((receipts) => {
      this.receipts = receipts;
      this.reset(this.receipts);
    });
  }

  findPrice(arr, name) {
    return arr.find((a) => a.name === name).price;
  }

  delete(receipt: Receipt) {
    this.receipts = this.receipts.filter((r) => r.id !== receipt.id);
    this.reset(this.receipts);
  }

  reset(receipts: Receipt[]) {
    // sort by date
    receipts = receipts.sort((val1, val2) => +new Date(val2.date) - +new Date(val1.date));
    // find involved people
    const columns = receipts.find((receipt) => !!receipt.people.length);
    if (columns) {
      this.displayedColumns = ['Date', ...columns.people.map((p) => p.name)];
    }
    // fill all short split with 0's and get total costs for each person
    this.totalFooter = receipts
      .map((t) => {
        const newSplit = t.people.map((person) => person.price);
        while (t.people.length < this.displayedColumns.length - 1) {
          newSplit.push(0);
        }
        return newSplit;
      })
      .reduce((acc, value) => acc.map((p, i) => p + value[i]), [0, 0, 0, 0, 0]);
    // assign to data table
    this.dataSource = new MatTableDataSource<Receipt>(receipts);
  }
}
