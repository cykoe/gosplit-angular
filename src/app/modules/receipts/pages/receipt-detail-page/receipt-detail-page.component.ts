import { FocusMonitor, FocusTrapFactory, ListKeyManager } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuid } from 'uuid';

import { BehaviorSubject } from 'rxjs';

import { CreateFormDialogComponent } from '../../../../shared/components/create-form-dialog/create-form-dialog.component';
import { TableDialogComponent } from '../../../../shared/components/table-dialog/table-dialog.component';
import { Item } from '../../shared/item.model';
import { Person, Receipt } from '../../shared/receipt.model';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail-page.component.html',
  styleUrls: ['./receipt-detail-page.component.scss'],
})
export class ReceiptDetailPageComponent implements OnInit {
  receipt: Receipt;
  keyManager: any;
  key$ = new BehaviorSubject<string>('');
  key = this.key$.asObservable();
  activeItemId = 0;

  @ViewChildren('card') card: QueryList<any>;
  @ViewChild('cardDisplay') cardDisplay: ElementRef<HTMLElement>;

  constructor(
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private sb: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }

  get people() {
    return this.receipt.people;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { receipt: Receipt }) => {
      this.receipt = data.receipt;
    });
  }

  autoSelect() {
    // this.receiptService.autoSelect(this.receipt)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }

  /**
   * create a new item
   */
  createReceipt(): void {
    const dialogRef = this.dialog.open(CreateFormDialogComponent, {
      width: '250px',
      data: Item.getPropertyNames(),
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.receipt.createItem({...result, id: uuid()});
        }
      });
  }

  /**
   * Check every person's price via a pop-up
   */
  checkSplit(): void {
    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '250px',
      data: this.receipt.people,
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        // console.log(result);
      });
  }

  /**
   * save an item's information, including name, price, and image
   * @param $event - contains original item's id and updated item
   */
  updateItem($event: { id: string, newItem: Item }) {
    this.receipt.updateItemById($event.id, $event.newItem);
  }

  /**
   * delete an item from the receipt list array
   * @param $event - contains target item's id
   */
  deleteItem($event: { id: string }) {
    this.receipt.deleteItemById($event.id);
  }

  /**
   * toggle a person's selection of an item
   * @param $event - contains the target person, item, and
   * and the item's index in person selection array
   */
  toggleItem($event: { person: Person, item: Item, index: number }) {
    this.receipt.toggleSelection($event.person, $event.item, $event.index);
  }

  /**
   * save receipt to the backend
   */
  updateReceipt() {
    this.receiptService.update(this.receipt)
      .subscribe(() => {
        this.sb.open('Saved!', 'OK');
      });
  }
}
