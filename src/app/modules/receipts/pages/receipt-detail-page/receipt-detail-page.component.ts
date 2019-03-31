import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuid } from 'uuid';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AppConfig } from '../../../../configs/app.config';
import { CreateFormDialogComponent } from '../../../../shared/components/create-form-dialog/create-form-dialog.component';
import { Item } from '../../shared/item.model';
import { Receipt } from '../../shared/receipt.model';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail-page.component.html',
  styleUrls: ['./receipt-detail-page.component.scss'],
})
export class ReceiptDetailPageComponent implements OnInit {
  receipt: Receipt;

  constructor(
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private sb: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params) => this.receiptService.read(params.get('id'))),
    ).subscribe((receipt: Receipt) => {
      this.receipt = receipt;
    });
  }

  createReceipt() {
    const dialogRef = this.dialog.open(CreateFormDialogComponent, {
      width: '250px',
      data: Item.getPropertyNames(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.receipt.createItem(new Item({...result, _id: uuid()}));
      }
    });
  }

  updateItem(item: Item) {
    this.receipt.updateItem(item);
    this.receipt.updateSplit(AppConfig.rewards);
  }

  deleteItem(item: Item) {
    this.receipt.deleteItem(item);
    this.receipt.updateSplit(AppConfig.rewards);
  }

  updateReceipt() {
    this.receiptService.update(this.receipt)
      .subscribe((res: Receipt) => {
        this.sb.open(`${res.people[0].name} Rocks!`, 'OK', {duration: AppConfig.sbDuration});
      });
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
