import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { HeaderService } from '../../core/services/header.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt-list.page.html',
  styleUrls: ['./receipt-list.page.sass'],
})
export class ReceiptListPage implements OnInit {
  isUploadingErrors;
  isLoadingResults = false;
  tab$: Observable<string>;

  constructor(
    private auth: AuthService,
    private headerService: HeaderService,
  ) {}

  ngOnInit() {
    this.tab$ = this.headerService.headerTabChange$;
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
