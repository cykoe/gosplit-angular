import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Receipt } from '../../../../shared/models/receipt';
import { ReceiptApiService } from '../../../../core/services/receipt-api.service';

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail.page.html',
  styleUrls: ['./receipt-detail.page.sass']
})
export class ReceiptDetailPage implements OnInit {

  receipt$: Observable<Receipt>;
  receipt: Receipt;
  // a list of people
  PEOPLE = ['Charlie', 'Takumi', 'Lawrence', 'Mohan', 'Haowei'];
  // 2D array maps to each user's selection on individual item
  booleanChart: boolean[][] = [];
  // 2D array map to each user's split on his selected item
  numberChart: number[][] = [];
  // list of item price
  receiptPrice: number[] = [];
  // list of each user's final split
  split: number[] = [];
  // tax cut per person = PP
  taxPP: number;
  // help to select/deselect all items of a row
  selectAllPrice: boolean[] = [];
  // 0 is non-driver, 1 is passenger, 2 is driver
  driverList: number[] = [0, 0, 0, 0, 0];
  // payment for driver
  driverFee = 10;
  // payment for passenger
  passengerFee = 5;

  constructor(
    private receiptApiService: ReceiptApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.receipt$ = this.route.paramMap.pipe(
      switchMap(params => this.receipt$ = this.receiptApiService.read(params.get('receiptId')))
    );
    // Initialize 2D array
    this.receipt$.subscribe(receipt => {
      this.receipt = receipt;
      this.receiptPrice = receipt.list.map(item => Number(item.price));
      this.taxPP = Number(receipt.tax) / this.PEOPLE.length;
      this.booleanChart = this.initializeChart(this.booleanChart, Number(receipt.length), this.PEOPLE.length, false, receipt.booleanChart);
      this.numberChart = this.initializeChart(this.numberChart, Number(receipt.length), this.PEOPLE.length, 0, receipt.numberChart);
      this.split = this.initializeList(this.split, this.PEOPLE.length, this.taxPP, receipt.split);
      this.selectAllPrice = this.initializeList(this.selectAllPrice, Number(receipt.length), false, receipt.selectAllPrice);
    });
  }

  changeRowPrice(itemIndex, personIndex) {
    this.booleanChart[itemIndex][personIndex] = !this.booleanChart[itemIndex][personIndex];
    let size = 0;
    for (let i = 0; i < this.PEOPLE.length; i++) {
      if (this.booleanChart[itemIndex][i]) {
        size++;
      }
    }
    if (size === this.PEOPLE.length || size === 0) {
      this.selectAllPrice[itemIndex] = !this.selectAllPrice[itemIndex];
    }
    for (let i = 0; i < this.PEOPLE.length; i++) {
      if (this.booleanChart[itemIndex][i]) {
        this.numberChart[itemIndex][i] = this.receiptPrice[itemIndex] / size;
      } else {
        this.numberChart[itemIndex][i] = 0.00;
      }
    }
    this.calculateFinalPrice();
  }

  selectAll(itemIndex) {
    this.selectAllPrice[itemIndex] = !this.selectAllPrice[itemIndex];
    for (let i = 0; i < this.PEOPLE.length; i++) {
      if (this.selectAllPrice[itemIndex]) {
        this.numberChart[itemIndex][i] = this.receiptPrice[itemIndex] / this.PEOPLE.length;
        this.booleanChart[itemIndex][i] = true;
      } else {
        this.numberChart[itemIndex][i] = 0.00;
        this.booleanChart[itemIndex][i] = false;
      }
    }
    this.calculateFinalPrice();
  }

  isDriver(personIndex) {
    if (this.driverList[personIndex] === 0) {
      // non-driver => passenger
      this.driverList[personIndex] = 1;
    } else if (this.driverList[personIndex] === 1) {
      // passenger => driver
      this.driverList[personIndex] = 2;
    } else {
      // driver => non-driver
      this.driverList[personIndex] = 0;
    }
    const driverFees = [];

    for (let i = 0; i < this.PEOPLE.length; i++) {
      driverFees[i] = 0.00;
    }
    for (let i = 0; i < this.PEOPLE.length; i++) {
      if (this.driverList[i] === 1) {
        driverFees[i] += this.passengerFee;
        for (let j = 0; j < this.PEOPLE.length; j++) {
          if (j === i) {
            continue;
          }
          driverFees[j] -= this.passengerFee / (this.PEOPLE.length - 1);
        }
      }
      if (this.driverList[i] === 2) {
        driverFees[i] += this.driverFee;
        for (let j = 0; j < this.PEOPLE.length; j++) {
          if (j === i) {
            continue;
          }
          driverFees[j] -= this.driverFee / (this.PEOPLE.length - 1);
        }
      }
    }
    this.calculateFinalPrice(driverFees);
  }

  saveReceipt() {
    this.receipt.driverList = this.driverList;
    this.receipt.split = this.split;
    this.receipt.numberChart = this.numberChart;
    this.receipt.booleanChart = this.booleanChart;
    this.receipt.selectAllPrice = this.selectAllPrice;
    this.receiptApiService.update(this.receipt)
      .subscribe(res => {
        this.router.navigate(['/']);
      });
  }

  private calculateFinalPrice(...drivers) {
    for (let i = 0; i < this.split.length; i++) {
      if (drivers[0]) {
        this.split[i] = this.taxPP - drivers[0][i];
      } else {
        this.split[i] = this.taxPP;
      }
    }
    for (let i = 0; i < this.PEOPLE.length; i++) {
      for (let j = 0; j < this.booleanChart.length; j++) {
        this.split[i] += this.numberChart[j][i];
      }
    }
  }

  private initializeChart(chart, rowLength, colLength, value, newChart) {
    if (newChart.length === 0) {
      for (let i = 0; i < rowLength; i++) {
        chart[i] = [];
        for (let j = 0; j < colLength; j++) {
          chart[i][j] = value;
        }
      }
      return chart;
    } else {
      return newChart;
    }
  }

  private initializeList(list, length, value, newList) {
    if (newList.length === 0) {
      for (let i = 0; i < length; i++) {
        list[i] = value;
      }
      return list;
    } else {
      return newList;
    }
  }
}
