import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';

import { Config } from '../../../../constants/config';
import { TableDialogComponent } from '../../../../shared/components/table-dialog/table-dialog.component';
import { IItem, IPerson, IReceipt } from '../../store/models';

@Component({
  selector: 'app-item-new-card',
  templateUrl: './item-new-card.component.html',
  styleUrls: ['./item-new-card.component.scss'],
})
export class ItemNewCardComponent implements OnInit {
  @Input() selectedReceipt: IReceipt;
  @Input() people: IPerson[];

  form: FormGroup;

  @Output() create = new EventEmitter<IItem>();
  @Output() update = new EventEmitter<IReceipt>();

  get name() {
    return this.form.get('name');
  }

  get price() {
    return this.form.get('price');
  }

  get image() {
    return this.form.get('image');
  }

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
      image: ['', [Validators.required]],
    });
  }

  updateReceipt() {
    this.update.emit(this.selectedReceipt);
  }

  checkSplit(): void {
    this.dialog.open(TableDialogComponent, {
      width: Config.DIALOG_WIDTH,
      data: this.people,
    });
  }

  createItem(): void {
    const {name, price, image} = this.form.value;
    const item: IItem = {id: uuid(), name, price, image, personIds: [], receiptId: this.selectedReceipt.id};
    this.create.emit(item);
    this.form.reset();
  }
}
