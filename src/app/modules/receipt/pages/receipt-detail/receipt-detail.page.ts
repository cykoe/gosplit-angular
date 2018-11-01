import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';

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
  receipt: <Receipt>;
  // a list of people
  PEOPLE = ['Charlie', 'Takumu', 'Lawrence', 'Mohan', 'Haowei'];
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
  driverFee: Number = 10;
  // payment for passenger
  passengerFee: Number = 5;

  constructor(
    private receiptApiService: ReceiptApiService,
    private route: ActivatedRoute
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
      for (let i = 0; i < Number(receipt.length); i++) {
        this.booleanChart[i] = [];
        this.numberChart[i] = [];
        this.selectAllPrice[i] = false;
        this.split[i] = this.taxPP;
        for (let j = 0; j < this.PEOPLE.length; j++) {
          this.booleanChart[i][j] = false;
          this.numberChart[i][j] = 0.00;
        }
      }
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
    if (size === this.PEOPLE.length) {
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
      driverFees[i] = 0.00
    }

    for (let i = 0; i < this.PEOPLE.length; i++) {
      if (this.driverList[i] === 1) {
        driverFees[i] += this.passengerFee;
        for (let j = 0; i < this.PEOPLE.length && j !== i; j++) {
          driverFees[j] -= this.passengerFee / (this.PEOPLE.length - 1);
        }
      }
      if (this.driverList[i] === 2) {
        driverFees[i] += this.driverFee;
        for (let j = 0; i < this.PEOPLE.length && j !== i; j++) {
          driverFees[j] -= this.driverFee / (this.PEOPLE.length - 1);
        }
      }
    }
    this.calculateFinalPrice(driverFees);
  }

  saveReceipt() {
    receipt.driverList = this.driverList;
    receipt.split = this.split;
    receipt.numberChart = this.numberChart;
    receipt.booleanChart = this.booleanChart;
  }

  private calculateFinalPrice(...drivers) {
    for (let i = 0; i < this.split.length; i++) {
      if(drivers[i]) {
        this.split[i] = this.taxPP - drivers[i];
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
}
