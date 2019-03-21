import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-upload',
  templateUrl: './receipt-upload-page.component.html',
  styleUrls: ['./receipt-upload-page.component.scss'],
})
export class ReceiptUploadPageComponent {

  form: FormGroup;
  loading = false;
  @Output() readonly isError = new EventEmitter<boolean>();
  @Output() readonly isUploading = new EventEmitter<boolean>();

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('payer') payer: ElementRef;
  @ViewChild('store') store: ElementRef;

  constructor(
    private fb: FormBuilder,
    private receiptApiService: ReceiptService,
    private router: Router,
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      receipt: null,
      payer: null,
      store: null,
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('receipt').setValue(file);
    }
  }

  private prepareSave(): any {
    const input = new FormData();
    input.append('receipt', this.form.get('receipt').value);
    input.append('payer', this.payer.nativeElement.value);
    input.append('store', this.store.nativeElement.value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    this.isUploading.emit(this.loading);
    this.receiptApiService.create(formModel)
      .subscribe((res) => {
        this.loading = false;
        this.isUploading.emit(this.loading);
        location.reload();
      }, (err) => {
        this.loading = false;
        this.isUploading.emit(this.loading);
        this.isError.emit(err);
      });
  }
}
