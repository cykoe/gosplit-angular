import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Config } from '../../../../constants/config';
import { CreateFormDialogComponent } from '../../../../shared/components/create-form-dialog/create-form-dialog.component';
import { DeleteConfirmDialogComponent } from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { IItem , IPerson } from '../../store/models';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() item: IItem;
  @Input() people: IPerson[];

  // item
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  // person
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

  updateItem(item: IItem): void {
    const dialogRef = this.dialog.open(CreateFormDialogComponent, {
      width: Config.DIALOG_WIDTH,
      data: item,
    });

    dialogRef.afterClosed().subscribe((result: IItem) => {
      if (result && result.id === item.id) {
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
      if (result && result.id === item.id) {
        this.delete.emit({item, receiptId: result.id});
      }
    });
  }

  toggleItem(person: IPerson, item: IItem, event): void {
    const personIds = event.checked
      ? [...item.personIds, person.id]
      : item.personIds.filter((id) => id !== person.id);
    this.toggle.emit({item: {...item, personIds}, receiptId: item.id});
  }
}
