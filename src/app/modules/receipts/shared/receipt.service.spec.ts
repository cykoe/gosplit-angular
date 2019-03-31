import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { MaterialModule } from '../../../shared/modules/material.module';

import { Receipt } from './receipt.model';
import { ReceiptService } from './receipt.service';

import { environment } from '../../../../environments/environment';
import { testItems, testPeople, testReceipts } from './data';
import { Item } from './item.model';

const config: SocketIoConfig = {url: environment.api_url, options: {}};

describe('ReceiptService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let receiptService: ReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SocketIoModule.forRoot(config),
        BrowserAnimationsModule,
        MaterialModule,
      ],
      providers: [
        ReceiptService,
      ],
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    receiptService = TestBed.get(ReceiptService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#listReceipts', () => {
    let expectedReceipts: any[];

    beforeEach(() => {
      const items = testItems.map((t) => new Item({...t, people: testPeople}).toJson());
      expectedReceipts = testReceipts.map((r) => new Receipt({...r, list: items, people: testPeople}).toJson());
    });

    it('should return all expected receipts (called once)', () => {
      receiptService.list().subscribe(
        (receipts) => expect(receipts.map((r) => r.toJson())).toEqual(expectedReceipts, 'should return all receipts'),
        fail,
      );

      const req = httpTestingController.expectOne(receiptService.url + receiptService.endpoint);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedReceipts);
    });

    it('should be Ok returning no receipts', () => {
      receiptService.list().subscribe(
        (receipts) => expect(receipts.length).toEqual(0),
        fail,
      );

      const req = httpTestingController.expectOne(receiptService.url + receiptService.endpoint);
      expect(req.request.method).toEqual('GET');

      req.flush([]);
    });

    it('should turn server errors into empty receipts', () => {
      receiptService.list().subscribe(
        (receipts) => expect(receipts.length).toEqual(0),
        fail,
      );

      const req = httpTestingController.expectOne(receiptService.url + receiptService.endpoint);
      expect(req.request.method).toEqual('GET');

      req.flush('err msg', {status: 404, statusText: 'not found'});
    });

    it('should return all expected results (called multiple times)', () => {
      receiptService.list().subscribe();
      receiptService.list().subscribe();
      receiptService.list().subscribe(
        (receipts) => expect(receipts.map((r) => r.toJson())).toEqual(expectedReceipts, 'should return expected receipts'),
        fail,
      );

      const reqs = httpTestingController.match(receiptService.url + receiptService.endpoint);
      // tslint:disable-next-line:no-magic-numbers
      expect(reqs.length).toEqual(3);

      reqs[0].flush([]);
      reqs[1].flush([]);
      reqs[2].flush(expectedReceipts);
    });

  });

  describe('#readReceipt', () => {
    let expectedReceipt: any;

    beforeEach(() => {
      const items = testItems.map((t) => new Item({...t, people: testPeople}).toJson());
      expectedReceipt = new Receipt({...testReceipts[0], list: items, people: testPeople}).toJson();
    });

    it('should return a receipt given its id', () => {
      receiptService.read(expectedReceipt.id).subscribe(
        (receipt) => expect(receipt.toJson()).toEqual(expectedReceipt),
        fail,
      );

      const req = httpTestingController.expectOne(receiptService.url + receiptService.endpoint + expectedReceipt.id);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedReceipt);
    });

    it('should return a empty receipt given an invalid id', () => {
      receiptService.read('wrongId').subscribe(
        (receipt) => {
          expect(receipt).toBeUndefined();
        },
        fail,
      );

      const req = httpTestingController.expectOne(receiptService.url + receiptService.endpoint + 'wrongId');
      expect(req.request.method).toEqual('GET');

      req.flush(null);
    });

    it('should turn sever errors into empty receipt', () => {
      receiptService.read('id').subscribe(
        (receipt) => expect(receipt).toBeUndefined(),
        fail,
      );

      const req = httpTestingController.expectOne(receiptService.url + receiptService.endpoint + 'id');
      expect(req.request.method).toEqual('GET');

      req.flush('err msg', {status: 404, statusText: 'not found'});
    });

  });
});
