import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { DeleteConfirmDialogComponent } from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

import { Item, Person } from '../../shared/receipt.model';

@Component({
  selector: 'app-receipt-detail-card',
  templateUrl: './receipt-detail-card.component.html',
  styleUrls: ['./receipt-detail-card.component.scss'],
})
export class ReceiptDetailCardComponent implements OnInit {
  // form for updating item
  form: FormGroup;

  // flag for editing and selection
  isEdit = false;
  isSelectAll = false;

  @Input() item: [Item, number];
  @Input() people: Person[];
  @Output() updated = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() toggled = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
  }

  get width(): number {
    // tslint:disable-next-line:no-magic-numbers
    return parseInt(`${12 / this.people.length}`, 10);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.item[0].name, Validators.required],
      price: [this.item[0].price, Validators.required],
      image: [this.item[0].image, Validators.required],
    });
  }

  /**
   * Remove the current item from the receipt list
   * A pop-up window will show to confirm the deletion
   * @param item - the item to be deleted
   */
  removeItem(item: Item): void {
    // pop up the confirmation window
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '250px',
      data: item,
    });
    // if the pop window returns the current item, then emit deletion
    dialogRef.afterClosed().subscribe((result: Item) => {
      if (result.id && result.id === item.id) {
        this.deleted.emit(item);
      }
    });
  }

  /**
   * Save the updated item. However, it is not saved
   * to the backend
   */
  save(): void {
    if (this.isEdit) {
      this.updated.emit({id: this.item[0].id, newItem: this.form.value});
    }
    this.isEdit = !this.isEdit;
  }

  /**
   * Cancel updating item
   */
  cancel(): void {
    this.isEdit = false;
  }

  /**
   * toggle one person' selection of the current item
   * @param person
   */
  toggle(person: Person): void {
    this.toggled.emit({person, item: this.item[0], index: this.item[1]});
  }

  /**
   * toggle all people's selection of the current item
   */
  toggleAll(): void {
    this.people.forEach((person) => {
      if (person.itemSelection[this.item[1]] === this.isSelectAll) {
        this.toggled.emit({person, item: this.item[0], index: this.item[1]});
      }
    });
    this.isSelectAll = !this.isSelectAll;
  }
}
