import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IGroup, IReceipt } from '../../../../constants/models';

@Component({
  selector: 'app-receipt-upload-box',
  templateUrl: './invoice-upload-box.component.html',
  styleUrls: ['./invoice-upload-box.component.scss'],
})
export class InvoiceUploadBoxComponent implements OnInit {
  form: FormGroup;

  @Input() groups: IGroup[];
  @Output() save = new EventEmitter<Partial<IReceipt>>();
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  get group() {
    return this.form.get('group');
  }

  get payer() {
    return this.form.get('payer');
  }

  get store() {
    return this.form.get('store');
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      image: ['', [Validators.required]],
      payer: ['', [Validators.required]],
      store: ['', [Validators.required]],
      group: ['', [Validators.required]],
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image').setValue(file);
    }
  }

  onSubmit() {
    const formValue = this.form.value;
    const receipt = {
      payer: formValue.payer,
      store: formValue.store,
      groupId: formValue.group.id,
      image: formValue.image,
    };
    this.save.emit(receipt);
    // TODO: initialize people array for new receipt
    // receipt.people = this.group.value.people.map((name) => {
    //   const person: Person = {
    //     name,
    //     price: 0,
    //     isDriver: false,
    //     isPassenger: false,
    //     itemSelection: new Array(receipt.list.length).fill(false),
    //   };
  }
}
