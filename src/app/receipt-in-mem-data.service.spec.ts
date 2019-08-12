import { TestBed } from '@angular/core/testing';

import { ReceiptInMemDataService } from './receipt-in-mem-data.service';

describe('ReceiptInMemDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceiptInMemDataService = TestBed.get(ReceiptInMemDataService);
    expect(service).toBeTruthy();
  });
});
