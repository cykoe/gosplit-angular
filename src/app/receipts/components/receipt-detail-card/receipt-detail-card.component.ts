import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';

import { CreateFormDialogComponent } from '../../../shared/components/create-form-dialog/create-form-dialog.component';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { TableDialogComponent } from '../../../shared/components/table-dialog/table-dialog.component';
import { Item, Person } from '../../shared/receipt.model';
import { IItem, IPerson, IReceipt } from '../../state/models';

@Component({
  selector: 'app-item-list',
  templateUrl: './receipt-detail-card.component.html',
  styleUrls: ['./receipt-detail-card.component.scss'],
})
export class ReceiptDetailCardComponent implements OnInit {
  // form for updating item
  form: FormGroup;
  @Input() selectedReceipt: IReceipt;

  // flag for editing and allSelection
  isEdit = false;
  isSelectAll = false;

  @Input() item: [Item, number];
  @Input() people: Person[];
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<any>();
  @Output() toggleAll = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
  }

  /**
   * For bootstrap to determine the grid size
   */
  get width(): number {
    // tslint:disable-next-line:no-magic-numbers
    return parseInt(`${12 / this.selectedReceipt.people.length}`, 10);
  }

  ngOnInit(): void {
    console.log(this.selectedReceipt);
    // this.form = this.fb.group({
    //   name: [this.item[0].name, Validators.required],
    //   price: [this.item[0].price, Validators.required],
    //   image: [this.item[0].image, Validators.required],
    // });
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
      width: '250px',
      data: newItem,
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.create.emit({item: result, receiptId: this.selectedReceipt.id});
        }
      });
  }

  checkSplit(): void {
    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '250px',
      data: this.selectedReceipt.people,
    });

    // dialogRef.afterClosed()
    //   .subscribe((result) => {
    //     // console.log(result);
    //   });
  }

  /**
   * Remove the current item from the receipt list
   * A pop-up window will show to confirm the deletion
   * @param item - the item to be deleted
   */
  deleteItem(item: IItem): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '250px',
      data: item,
    });
    // if the pop window returns the current item, then emit deletion
    dialogRef.afterClosed().subscribe((result: IItem) => {
      if (result.id && result.id === item.id) {
        this.delete.emit({item, receiptId: this.selectedReceipt.id});
      }
    });
  }

  /**
   * Update item to receipt model
   * Note, it is not saved to the backend yet
   */
  updateItem(item: IItem): void {
    // pop up the confirmation window
    const dialogRef = this.dialog.open(CreateFormDialogComponent, {
      width: '250px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result: IItem) => {
      if (result) {
        this.update.emit({item: result, receiptId: this.selectedReceipt.id});

      }
    });
    // if (this.isEdit) {
    //   const newItem = {...this.form.value, id: this.item[0].id};
    //   this.update.emit({item: newItem, receiptId: this.selectedReceipt.id});
    // }
    // this.isEdit = !this.isEdit;
  }

  /**
   * Cancel updating item
   */
  cancel(): void {
    this.isEdit = false;
  }

  toggleItem(person: IPerson, item: IItem, index: number): void {
    this.toggle.emit({person, item, index, receiptId: this.selectedReceipt.id});
  }

  /**
   * toggle all people's selection of the current item
   */
  toggleAllItems(item: IItem, index: number): void {
    this.isSelectAll = !this.isSelectAll;
    this.toggleAll.emit({selection: this.isSelectAll, item, index, receiptId: this.selectedReceipt.id});
    // this.people.forEach((person) => {
    //   console.log(person);
    //   if (person.itemSelection[this.item[1]] === this.isSelectAll) {
    //     this.toggle.emit({person, item: this.item[0], index: this.item[1], receiptId: this.selectedReceipt.id});
    //   }
    // });
  }
}
