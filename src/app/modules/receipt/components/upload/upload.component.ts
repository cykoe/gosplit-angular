import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ReceiptApiService } from '../../../../core/services/receipt-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent {

  form: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private receiptApiService: ReceiptApiService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      receipt: null
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('receipt').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('receipt', this.form.get('receipt').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    this.receiptApiService.create(formModel)
      .subscribe(res => {
        this.loading = false;
      })
  }

  clearFile() {
    this.form.get('receipt').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
