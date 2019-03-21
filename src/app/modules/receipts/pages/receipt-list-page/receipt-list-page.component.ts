import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../core/services/auth.service';
import { HeaderService } from '../../../../core/services/header.service';
import { ReceiptService } from '../../shared/receipt.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt-list-page.component.html',
  styleUrls: ['./receipt-list-page.component.scss'],
})
export class ReceiptListPageComponent implements OnInit {
  isUploadingErrors;
  isLoadingResults = false;
  tab$: Observable<string>;

  constructor(
    private auth: AuthService,
    private headerService: HeaderService,
    private receiptService: ReceiptService,
  ) {}

  ngOnInit() {
    this.tab$ = this.headerService.headerTabChange$;
    this.receiptService.list().subscribe((res) => {
      console.log(res);
    });
  }

  onErrors(error: string) {
    error ? this.isUploadingErrors = error : this.isUploadingErrors = undefined;
  }

  onUploading(isUploading: boolean) {
    isUploading ? this.isLoadingResults = true : this.isLoadingResults = false;
  }

  isLoggedIn(): boolean {
    return !!this.auth.token;
  }
}
