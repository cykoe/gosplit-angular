import { TestBed } from '@angular/core/testing';

import { ReceiptApiService } from './receipt-api.service';

describe('ReceiptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceiptApiService = TestBed.get(ReceiptApiService);
    expect(service).toBeTruthy();
  });
});
