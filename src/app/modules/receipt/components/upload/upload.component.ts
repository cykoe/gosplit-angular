import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceiptApiService } from '../../../../core/services/receipt-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent {

  form: FormGroup;
  loading = false;
  @Output() isError = new EventEmitter<boolean>();
  @Output() isUploading = new EventEmitter<boolean>();

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('payer') payer: ElementRef;

  constructor(
    private fb: FormBuilder,
    private receiptApiService: ReceiptApiService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      receipt: null,
      payer: null,
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

    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    this.isUploading.emit(this.loading);
    this.receiptApiService.create(formModel)
      .subscribe(res => {
        this.loading = false;
        this.isUploading.emit(this.loading);
        location.reload();
      }, err => {
        this.loading = false;
        this.isUploading.emit(this.loading);
        this.isError.emit(err);
      });
  }
}
