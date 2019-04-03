import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AppConfig } from '../../../../configs/app.config';
import { HeaderService } from '../../../../core/services/header.service';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-upload',
  templateUrl: './receipt-upload-page.component.html',
  styleUrls: ['./receipt-upload-page.component.scss'],
})
export class ReceiptUploadPageComponent implements OnInit {
  form: FormGroup;
  loading = false;

  tab$: Observable<string>;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptService,
    private headerService: HeaderService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.headerService.headerTabChange$.subscribe((tab) => {
      if (tab === 'Home') {
        this.router.navigate([`/${AppConfig.routes.receipts}/${AppConfig.routes.home}`]);
      } else if (tab === 'About') {
        this.router.navigate([`/${AppConfig.routes.accounts}/${AppConfig.routes.login}`]);
      }
    });
    this.form = this.fb.group({
      receipt: ['', [Validators.required]],
      payer: ['', [Validators.required]],
      store: ['', [Validators.required]],
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
    input.append('payer', this.form.get('payer').value);
    input.append('store', this.form.get('store').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    this.receiptService.create(formModel)
      .subscribe((res) => {
        this.router.navigateByUrl('/');
        this.loading = false;
      }, (err) => {
        this.loading = false;
      });
  }
}
