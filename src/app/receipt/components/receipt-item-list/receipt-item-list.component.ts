import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';

import { Config } from '../../../constants/config';
import { CreateFormDialogComponent } from '../../../shared/components/create-form-dialog/create-form-dialog.component';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { TableDialogComponent } from '../../../shared/components/table-dialog/table-dialog.component';
import { IItem, IPerson, IReceipt } from '../../../constants/models';

@Component({
  selector: 'app-item-list',
  templateUrl: './receipt-item-list.component.html',
  styleUrls: ['./receipt-item-list.component.scss'],
})
export class ReceiptItemListComponent implements OnInit {
  @Input() selectedReceipt: IReceipt;

  @Output() create = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<any>();
  @Output() toggleAll = new EventEmitter<any>();

  get width(): number {
    return parseInt(`${Config.GRID_SIZE / this.selectedReceipt.people.length}`, 10);
  }

  constructor(
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  createItem(): void {
    const newItem: IItem = {
      id: uuid(),
      name: '',
      price: 0,
      image: '',
      people: this.selectedReceipt.people.map((p) => ({
        name: p.name,
        selection: false,
        price: 0,
        isDriver: false,
        isPassenger: false,
      })),
    };

    const dialogRef = this.dialog.open(CreateFormDialogComponent, {
      width: Config.DIALOG_WIDTH,
      data: newItem,
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.create.emit({item: result, receiptId: this.selectedReceipt.id});
        }
      });
  }

  updateItem(item: IItem): void {
    const dialogRef = this.dialog.open(CreateFormDialogComponent, {
      width: Config.DIALOG_WIDTH,
      data: item,
    });

    dialogRef.afterClosed().subscribe((result: IItem) => {
      if (result.id && result.id === item.id) {
        this.update.emit({item: result, receiptId: this.selectedReceipt.id});
      }
    });
  }

  deleteItem(item: IItem): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: Config.DIALOG_WIDTH,
      data: item,
    });
    dialogRef.afterClosed().subscribe((result: IItem) => {
      if (result.id && result.id === item.id) {
        this.delete.emit({item, receiptId: this.selectedReceipt.id});
      }
    });
  }

  toggleItem(person: IPerson, item: IItem, index: number): void {
    this.toggle.emit({person, item, index, receiptId: this.selectedReceipt.id});
  }

  toggleAllItems(item: IItem, index: number): void {
    this.toggleAll.emit({item, index, receiptId: this.selectedReceipt.id});
  }

  checkSplit(): void {
    this.dialog.open(TableDialogComponent, {
      width: Config.DIALOG_WIDTH,
      data: this.selectedReceipt.people,
    });
  }
}
