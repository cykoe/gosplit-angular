import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IItem, IReceipt } from '../../../constants/models';

@Component({
  selector: 'app-create-form-dialog',
  templateUrl: './create-form-dialog.component.html',
  styleUrls: ['./create-form-dialog.component.scss'],
})
export class CreateFormDialogComponent implements OnInit {
  form: FormGroup;
  formControlNames: string[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IItem,
  ) {
  }

  ngOnInit() {
    const formData = {};
    this.formControlNames = Object.keys(this.data).filter((d) => d !== 'id' && d !== 'people');
    this.formControlNames.forEach((prop) => {
      formData[prop] = [this.data[prop], Validators.required];
    });
    this.form = this.fb.group(formData);
  }
}
