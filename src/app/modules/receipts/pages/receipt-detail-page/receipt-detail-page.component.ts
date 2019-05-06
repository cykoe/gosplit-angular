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
export class ReceiptDetailPageComponent implements OnInit, AfterViewInit {
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
    private focusMonitor: FocusMonitor,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private focusTrap: FocusTrapFactory,
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { receipt: Receipt }) => {
      this.receipt = data.receipt;
    });
  }

  ngAfterViewInit() {
    this.keyManager = new ListKeyManager(this.card);
    this.keyManager.withWrap();
    const focusTrap = this.focusTrap.create(this.cardDisplay.nativeElement);
    focusTrap.focusInitialElement();
    this.keyManager.setFirstItemActive();
  }

  autoSelect() {
    this.receiptService.autoSelect(this.receipt)
      .subscribe((res) => {
        // console.log(res);
      });
  }

  onKeyDown($event) {
    if ($event.shiftKey && $event.key === 'Tab') {
      this.keyManager.onKeydown($event);
      this.keyManager.setPreviousItemActive();
      this.activeItemId = this.keyManager.activeItemIndex;
    } else if (!$event.shiftKey && $event.key === 'Tab') {
      this.keyManager.onKeydown($event);
      this.keyManager.setNextItemActive();
      this.activeItemId = this.keyManager.activeItemIndex;
    } else {
      this.key$.next($event.key);
    }
  }

  select(item: Item) {
    const found = this.receipt.list.findIndex((i) => i === item);
    if (found) {
      this.keyManager.setActiveItem(found);
      console.log(this.keyManager.activeItemIndex);
      this.activeItemId = this.keyManager.activeItemIndex;
    }
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
    this.receipt.updateItem();
    this.receipt.updateSplit(AppConfig.rewards);
  }

  deleteItem(item: Item) {
    this.receipt.deleteItem(item);
    this.receipt.updateSplit(AppConfig.rewards);
  }

  updateReceipt() {
    this.receiptService.update(this.receipt)
      .subscribe((res: Receipt) => {
        this.sb.open(`Saved!`, 'OK', {duration: AppConfig.sbDuration});
      });
  }
}
