import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Item } from '../../shared/item.model';
import { Receipt } from '../../shared/receipt.model';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail-page.component.html',
  styleUrls: ['./receipt-detail-page.component.scss'],
})
export class ReceiptDetailPageComponent implements OnInit {
  form: FormGroup;

  receipt: Receipt;

  constructor(
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      price: [''],
      image: [''],
    });

    this.route.paramMap.pipe(
      switchMap((params) => this.receiptService.read(params.get('id'))),
    ).subscribe((receipt: Receipt) => {
      this.receipt = receipt;
    });
  }

  createItem(item: any) {
    this.receipt.createItem(new Item(item));
  }

  updateItem(item: Item) {
    this.receipt.updateItem(item);
  }

  deleteItem(item: Item) {
    this.receipt.deleteItem(item);
  }

  // changeRowPrice(itemIndex, personIndex) {
  //   this.booleanChart[itemIndex][personIndex] = !this.booleanChart[itemIndex][personIndex];
  //   let size = 0;
  //   if (
  //     this.booleanChart[itemIndex].every((item) => item) ||
  //     this.booleanChart[itemIndex].every((item) => !item)) {
  //     this.selectAllPrice[itemIndex] = !this.selectAllPrice[itemIndex];
  //   }
  //   this.booleanChart[itemIndex].forEach((bc) => bc ? size++ : null);
  //   this.booleanChart[itemIndex].forEach((bc, i) => this.numberChart[itemIndex][i] = bc ? this.receiptPrice[itemIndex] / size : 0.00);
  //   this.calculateFinalPrice();
  //   this.receiptService.editReceipt(this.receipt);
  // }
  //
  // selectAll(itemIndex) {
  //   this.selectAllPrice[itemIndex] = !this.selectAllPrice[itemIndex];
  //   for (let i = 0; i < this.PEOPLE.length; i++) {
  //     if (this.selectAllPrice[itemIndex]) {
  //       this.numberChart[itemIndex][i] = this.receiptPrice[itemIndex] / this.PEOPLE.length;
  //       this.booleanChart[itemIndex][i] = true;
  //     } else {
  //       this.numberChart[itemIndex][i] = 0.00;
  //       this.booleanChart[itemIndex][i] = false;
  //     }
  //   }
  //   this.calculateFinalPrice();
  // }
  //
  // isDriver(personIndex) {
  //   if (this.driverList[personIndex] === 0) {
  //     // non-driver => passenger
  //     this.driverList[personIndex] = 1;
  //   } else if (this.driverList[personIndex] === 1) {
  //     // passenger => driver
  //     this.driverList[personIndex] = 2;
  //   } else {
  //     // driver => non-driver
  //     this.driverList[personIndex] = 0;
  //   }
  //   const driverFees = [];
  //
  //   for (let i = 0; i < this.PEOPLE.length; i++) {
  //     driverFees[i] = 0.00;
  //   }
  //   for (let i = 0; i < this.PEOPLE.length; i++) {
  //     if (this.driverList[i] === 1) {
  //       driverFees[i] += this.passengerFee;
  //       for (let j = 0; j < this.PEOPLE.length; j++) {
  //         if (j === i) {
  //           continue;
  //         }
  //         driverFees[j] -= this.passengerFee / (this.PEOPLE.length - 1);
  //       }
  //     }
  //     if (this.driverList[i] === 2) {
  //       driverFees[i] += this.driverFee;
  //       for (let j = 0; j < this.PEOPLE.length; j++) {
  //         if (j === i) {
  //           continue;
  //         }
  //         driverFees[j] -= this.driverFee / (this.PEOPLE.length - 1);
  //       }
  //     }
  //   }
  //   this.calculateFinalPrice(driverFees);
  // }

  // saveReceipt() {
  //   this.receipt.driverList = this.driverList;
  //   this.receipt.split = this.split;
  //   this.receipt.numberChart = this.numberChart;
  //   this.receipt.booleanChart = this.booleanChart;
  //   this.receipt.selectAllPrice = this.selectAllPrice;
  //   this.receiptService.update(this.receipt)
  //     .subscribe(() => {
  //       this.router.navigate(['/']);
  //     });
  // }

  // private calculateFinalPrice(...drivers) {
  //   for (let i = 0; i < this.split.length; i++) {
  //     this.split[i] = (drivers[0]) ? this.taxPP - drivers[0][i] : this.taxPP;
  //   }
  //   for (let i = 0; i < this.PEOPLE.length; i++) {
  //     for (let j = 0; j < this.booleanChart.length; j++) {
  //       this.split[i] += this.numberChart[j][i];
  //     }
  //   }
  // }
}
