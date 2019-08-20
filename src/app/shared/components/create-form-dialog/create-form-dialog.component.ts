import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IItem} from '../../../features/invoice/store/models';

@Component({
  selector: 'app-create-form-dialog',
  templateUrl: './create-form-dialog.component.html',
  styleUrls: ['./create-form-dialog.component.scss'],
})
export class CreateFormDialogComponent implements OnInit {

  form: FormGroup;
  formControlNames: string[];

  get name() {
    return this.form.get('name');
  }

  get price() {
    return this.form.get('price');
  }

  get image() {
    return this.form.get('image');
  }

  get returnValue() {
    const {name, price, image} = this.form.value;
    const newItem = {...this.data, name, price, image};
    return newItem;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IItem,
  ) {
  }

  ngOnInit() {
    const data = this.data;
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
      image: [data.image, [Validators.required]],
    });
  }
}
