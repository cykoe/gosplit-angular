import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReceiptApiService } from './receipt-api.service';

describe('ReceiptService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: ReceiptApiService = TestBed.get(ReceiptApiService);
    expect(service).toBeTruthy();
  });
});
