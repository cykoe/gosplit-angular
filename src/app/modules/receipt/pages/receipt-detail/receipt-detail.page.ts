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

  PEOPLE = ['Charlie', 'Takumu', 'Lawrence', 'Mohan', 'Haowei'];
  receipt$: Observable<Receipt>;
  booleanChart: boolean[][] = [];
  numberChart: number[][] = [];
  receiptPrice: number[] = [];
  selectAllPrice: boolean[] = [];
  finalPrice: number[] = [];
  taxPP: number;
  // 0 is non-driver, 1 is passenger, 2 is driver
  driverList: number[] = [0, 0, 0, 0, 0];
  driverFee: Number = 10;
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
      this.receiptPrice = receipt.list.map(item => Number(item.price));
      this.taxPP = Number(receipt.tax) / 5;
      for (let i = 0; i < Number(receipt.length); i++) {
        this.booleanChart[i] = [];
        this.numberChart[i] = [];
        this.selectAllPrice[i] = false;
        this.finalPrice[i] = this.taxPP;
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
      if (this.driverList[i] === 0) {
        driverFees[i] = 0;
      }
      if (this.driverList[i] === 1) {
        driverFees[i] = 5;
      }
      if (this.driverList[i] === 2) {
        driverFees[i] = 10;
      }
    }
    this.calculateFinalPrice(driverFees);
  }

  private calculateFinalPrice(...drivers) {
    for (let i = 0; i < this.finalPrice.length; i++) {
      this.finalPrice[i] = this.taxPP - drivers[i];
    }

    for (let i = 0; i < this.PEOPLE.length; i++) {
      for (let j = 0; j < this.booleanChart.length; j++) {
        this.finalPrice[i] += this.numberChart[j][i];
      }
    }
  }
}
