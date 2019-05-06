import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

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
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReceiptListPageComponent implements OnInit {
  dataSource;
  displayedColumns: string[];
  totalFooter: number[];
  receipts: Receipt[];
  selection = new SelectionModel<Receipt>(true, []);

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
    this.displayedColumns = ['Select', 'Date'];
    this.receiptService.list().subscribe((receipts) => {
      this.receipts = receipts;
      this.reset(this.receipts);
    });
  }

  findPrice(arr, name) {
    const foundPerson = arr.find((a) => a.name === name);
    if (!foundPerson) {
      return 0;
    } else {
      return arr.find((a) => a.name === name).price;
    }
  }

  delete(receipt: Receipt) {
    this.receipts = this.receipts.filter((r) => r.id !== receipt.id);
    this.reset(this.receipts);
  }

  reset(receipts: Receipt[]) {
    receipts = receipts.sort((val1, val2) => +new Date(val2.date) - +new Date(val1.date));
    const columns = receipts.find((receipt) => !!receipt.people.length);
    if (columns) {
      this.displayedColumns = ['Select', 'Date', ...columns.people.map((p) => p.name)];
    }
    this.totalFooter = new Array(this.displayedColumns.length - 2).fill(0);
    this.dataSource = new MatTableDataSource<Receipt>(receipts);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row) => this.selection.select(row));
    this.calculateTotal();
  }

  rowToggle(row) {
    this.selection.toggle(row);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalFooter = this.selection.selected
      .map((t) => {
        const newSplit = t.people.map((person) => person.price);
        while (t.people.length < this.displayedColumns.length - 2) {
          newSplit.push(0);
        }
        return newSplit;
      })
      .reduce((acc, value) => acc.map((p, i) => p + value[i]), [0, 0, 0, 0, 0]);
  }
}
