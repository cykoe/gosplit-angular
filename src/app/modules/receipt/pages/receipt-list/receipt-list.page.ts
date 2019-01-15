import { Component } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt-list.page.html',
  styleUrls: ['./receipt-list.page.sass']
})
export class ReceiptListPage {
  isUploadingErrors;
  isLoadingResults = false;

  onErrors(error: string) {
    error ? this.isUploadingErrors = error : this.isUploadingErrors = undefined;
  }

  onUploading(isUploading: boolean) {
    isUploading ? this.isLoadingResults = true : this.isLoadingResults = false;
  }
}
