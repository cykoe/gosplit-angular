import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Config } from '../../../../constants/config';
import { TableDialogComponent } from '../../../../shared/components/table-dialog/table-dialog.component';
import { IPerson, IReceipt } from '../../store/models';

@Component({
  selector: 'app-item-info',
  templateUrl: './invoice-item-info.component.html',
  styleUrls: ['./invoice-item-info.component.scss'],
})
export class InvoiceItemInfoComponent implements OnInit {
  @Input() selectedReceipt: IReceipt;
  @Input() people: IPerson[];

  @Output() update = new EventEmitter<IReceipt>();

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  updateReceipt() {
    // TODO: edit receipt in template
    this.update.emit(this.selectedReceipt);
  }

  checkSplit(): void {
    this.dialog.open(TableDialogComponent, {
      width: Config.DIALOG_WIDTH,
      data: this.people,
    });
  }
}
