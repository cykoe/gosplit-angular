import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt-list.page.html',
  styleUrls: ['./receipt-list.page.sass'],
})
export class ReceiptListPage {
  isUploadingErrors;
  isLoadingResults = false;

  constructor(
    private auth: AuthService,
  ) {}

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
