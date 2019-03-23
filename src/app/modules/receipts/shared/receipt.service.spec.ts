import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Receipt } from './receipt.model';
import { ReceiptService } from './receipt.service';

import { testItems } from './data/item.seed';
import { testPeople } from './data/person.seed';
import { testReceipts } from './data/receipt.seed';

describe('ReceiptService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ReceiptService = TestBed.get(ReceiptService);
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    const testItemList =
    const testReceipt: Receipt = new Receipt(testReceipts.map);
  });
});
