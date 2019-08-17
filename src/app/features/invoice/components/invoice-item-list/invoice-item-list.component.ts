import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';

import { Config } from '../../../../constants/config';
import { CreateFormDialogComponent } from '../../../../shared/components/create-form-dialog/create-form-dialog.component';
import { DeleteConfirmDialogComponent } from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { IItem , IPerson } from '../../store/models';

@Component({
  selector: 'app-item-list',
  templateUrl: './invoice-item-list.component.html',
  styleUrls: ['./invoice-item-list.component.scss'],
})
export class InvoiceItemListComponent implements OnInit {
  @Input() items: IItem[];
  @Input() people: IPerson[];

  @Output() create = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<any>();

  get width(): number {
    return parseInt(`${Config.GRID_SIZE / this.people.length}`, 10);
  }

  getChecked(item: IItem, name: string): boolean {
    // TODO: take out in future
    if (!item.personIds) {
      item.personIds = [];
    }
    return item.personIds.includes(name);
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
      // TODO: add people
      // people: this.selectedReceipt.people.map((p) => ({
      //   name: p.name,
      //   selection: false,
      //   price: 0,
      //   isDriver: false,
      //   isPassenger: false,
      // })),
    };

    const dialogRef = this.dialog.open(CreateFormDialogComponent, {
      width: Config.DIALOG_WIDTH,
      data: newItem,
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.create.emit({item: result, receiptId: result.id});
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
        this.update.emit({item: result, receiptId: result.id});
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
        this.delete.emit({item, receiptId: result.id});
      }
    });
  }

  toggleItem(person: IPerson, item: IItem, index: number, event): void {
    const personIds = event.checked
      ? [...item.personIds, person.id]
      : item.personIds.filter((id) => id !== person.id);
    this.toggle.emit({item: {...item, personIds}, index, receiptId: item.id});
  }
}
