import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styles: [],
})
export class DeleteConfirmDialogComponent {
  warning: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    // TODO: temporary fix to determine between receipt and item, need a better to differentiate them
    if (data.price) {
      this.warning = data
        ? `Are you sure to delete ${data.name}?`
        : 'Sure?';
    } else {
      const date = data.date ? `on ${data.date}` : '';
      this.warning = data
        ? `Are you sure to delete the receipt
      paid by ${data.payer.toUpperCase()}
       at ${data.store.toUpperCase()}${date}?`
        : 'Sure?';
    }
  }

}
