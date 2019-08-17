import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { IReceipt } from '../../../constants/models';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ReceiptService } from '../../receipt.service';

@Component({
  selector: 'app-receipt-list-card',
  templateUrl: './receipt-list-table-detail.component.html',
  styleUrls: ['./receipt-list-table-detail.component.scss'],
})
export class ReceiptListTableDetailComponent implements OnInit {
  @Input() receipt: IReceipt;
  @Output() deleted = new EventEmitter<IReceipt>();
  @Output() selected = new EventEmitter<IReceipt>();

  constructor(
    private router: Router,
    private receiptService: ReceiptService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  receiptSelected(receipt: IReceipt): void {
    // this.router.navigate([`receipts/groups/groupId/${receipt.toUrlDate()}/${receipt.store}/${receipt.id}`]);
    this.selected.emit(receipt);
  }

  /**
   * Delete selected receipt
   * A pop-up box will show up for confirmation
   * Then the receipt will pass to parent component
   * @param receipt - receipt to be deleted
   */
  receiptDeleted(receipt: IReceipt) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '250px',
      data: receipt,
    });
    dialogRef.afterClosed()
      .subscribe((r: IReceipt) => {
        if (r) {
          this.deleted.emit(receipt);
        }
      });
  }
}
