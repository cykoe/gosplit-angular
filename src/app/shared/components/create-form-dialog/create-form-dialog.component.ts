import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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
    @Inject(MAT_DIALOG_DATA) private data: string[],
  ) {
  }

  ngOnInit() {
    const formData = {};
    this.formControlNames = this.data.filter((d) => d !== 'prototype');
    this.formControlNames.forEach((d) => {
      formData[d] = ['', Validators.required];
    });
    this.form = this.fb.group(formData);
  }
}
