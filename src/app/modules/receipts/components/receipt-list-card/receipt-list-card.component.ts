import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { DeleteConfirmDialogComponent } from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { Receipt } from '../../shared/receipt.model';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-receipt-list-card',
  templateUrl: './receipt-list-card.component.html',
  styleUrls: ['./receipt-list-card.component.scss'],
})
export class ReceiptListCardComponent implements OnInit {
  @Input() receipt: Receipt;
  @Output() deleted = new EventEmitter<Receipt>();

  constructor(
    private router: Router,
    private receiptService: ReceiptService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Navigate to receipt detail page
   * @param receipt - receipt to be navigated
   */
  read(receipt: Receipt): void {
    this.router.navigate([`receipts/groups/groupId/${receipt.toUrlDate()}/${receipt.store}/${receipt.id}`]);
  }

  /**
   * Delete selected receipt
   * A pop-up box will show up for confirmation
   * Then the receipt will pass to parent component
   * @param receipt - receipt to be deleted
   */
  delete(receipt: Receipt) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '250px',
      data: receipt,
    });
    dialogRef.afterClosed()
      .pipe(
        switchMap((result: Receipt) => result.id === receipt.id ? this.receiptService.delete(receipt) : undefined),
      )
      .subscribe(() => {
        this.deleted.emit(receipt);
      });
  }
}
