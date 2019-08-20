import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IGroup } from '../../../group/store/group.model';
import { IReceipt } from '../../store/models';

@Component({
  selector: 'app-receipt-upload-box',
  templateUrl: './invoice-upload-box.component.html',
  styleUrls: ['./invoice-upload-box.component.scss'],
})
export class InvoiceUploadBoxComponent implements OnInit {
  form: FormGroup;

  @Input() group: IGroup;
  @Output() save = new EventEmitter<Partial<IReceipt>>();
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

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
  }
}
