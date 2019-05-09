import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-upload',
  templateUrl: './receipt-upload-page.component.html',
  styleUrls: ['./receipt-upload-page.component.scss'],
})
export class ReceiptUploadPageComponent implements OnInit {
  form: FormGroup;
  loading = false;
  groups = {};

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptService,
    private router: Router,
    private auth: AuthService,
  ) {
  }

  get group() {
    return this.form.get('group');
  }

  get payer() {
    return this.form.get('payer');
  }

  get store() {
    return this.form.get('store');
  }

  ngOnInit(): void {
    this.auth.readFriends().subscribe((list) => {
      this.groups = list;
    });
    this.form = this.fb.group({
      receipt: ['', [Validators.required]],
      payer: ['', [Validators.required]],
      store: ['', [Validators.required]],
      group: ['', [Validators.required]],
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('receipt').setValue(file);
    }
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    this.receiptService.create(formModel)
      .subscribe((res) => {
        this.router.navigateByUrl('/receipts');
        this.loading = false;
      }, (err) => {
        this.loading = false;
      });
  }

  private prepareSave(): any {
    const input = new FormData();
    input.append('receipt', this.form.get('receipt').value);
    input.append('payer', this.form.get('payer').value);
    input.append('store', this.form.get('store').value);
    input.append('group', this.form.get('group').value);
    return input;
  }
}
