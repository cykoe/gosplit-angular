import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

// import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { MaterialModule } from '../../../shared/modules/material.module';

import { Receipt } from './receipt.model';
import { ReceiptService } from './receipt.service';

import { environment } from '../../../../environments/environment';
import { testList, testPeople, testReceipts } from './data';
import { Item } from './item.model';

// const config: SocketIoConfig = {url: environment.api_url, options: {}};

describe('ReceiptService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let receiptService: ReceiptService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const sbSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        // SocketIoModule.forRoot(config),
        BrowserAnimationsModule,
        MaterialModule,
      ],
      providers: [
        ReceiptService,
        {provide: MatSnackBar, useValue: sbSpy},
      ],
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    receiptService = TestBed.get(ReceiptService);
    matSnackBarSpy = TestBed.get(MatSnackBar);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#list', () => {
    let expectedReceipts: any[];

    beforeEach(() => {
      const items = testList.map((t) => new Item({...t, people: testPeople}).toJson());
      expectedReceipts = testReceipts.map((r) => new Receipt({...r, list: items, people: testPeople}).toJson());
    });

    it('should return all expected receipts - called once', () => {
      receiptService.list('').subscribe(
        (receipts) => expect(receipts.map((r) => r.toJson())).toEqual(expectedReceipts, 'should return all receipts'),
        fail,
      );

      const req = httpTestingController.expectOne(`${receiptService.url}/${receiptService.receiptUrl}?groupId=`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedReceipts);
    });

    it('should be Ok re`turning no receipts', () => {
      receiptService.list('').subscribe(
        (receipts) => expect(receipts.length).toEqual(0),
        fail,
      );

      const req = httpTestingController.expectOne(`${receiptService.url}/${receiptService.receiptUrl}?groupId=`);
      expect(req.request.method).toEqual('GET');

      req.flush([]);
    });

    it('should turn server errors into empty receipts', () => {
      const msg = 'err msg';
      receiptService.list('').subscribe(
        () => fail,
        (error) => expect(error.message).toContain(msg),
      );

      const req = httpTestingController.expectOne(`${receiptService.url}/${receiptService.receiptUrl}?groupId=`);
      expect(req.request.method).toEqual('GET');

      req.flush(msg, {status: 404, statusText: 'not found'});
    });

    it('should return all expected results (called multiple times)', () => {
      receiptService.list('').subscribe();
      receiptService.list('').subscribe();
      receiptService.list('').subscribe(
        (receipts) => expect(receipts.map((r) => r.toJson())).toEqual(expectedReceipts, 'should return expected receipts'),
        fail,
      );

      const reqs = httpTestingController.match(`${receiptService.url}/${receiptService.receiptUrl}?groupId=`);
      // tslint:disable-next-line:no-magic-numbers
      expect(reqs.length).toEqual(3);

      reqs[0].flush([]);
      reqs[1].flush([]);
      reqs[2].flush(expectedReceipts);
    });

  });

  // describe('#create', () => {
  //   let expectedReceipt: Receipt;
  //
  //   beforeEach(() => {
  //     const items = testList.map((t) => new Item({...t, people: testPeople}).toJson());
  //     expectedReceipt = new Receipt({...testReceipts[0], list: items, people: testPeople});
  //   });
  //
  //   it('should create a receipt', () => {
  //     receiptService.create(expectedReceipt.toJson()).subscribe(
  //       (receipt: Receipt) => {
  //         console.log(receipt);
  //         console.log(expectedReceipt);
  //         expect(receipt.toJson()).toEqual(expectedReceipt.toJson());},
  //       fail,
  //     );
  //
  //     const req = httpTestingController.expectOne(`${receiptService.url}/${receiptService.receiptUrl}`);
  //     expect(req.request.method).toEqual('POST');
  //
  //     req.flush(expectedReceipt);
  //   });
  //
  //   it('should fail to create receipt - server errors', () => {
  //     const msg = 'err msg';
  //     receiptService.create(expectedReceipt.toJson()).subscribe(
  //       fail,
  //       (error) => expect(error.message).toContain(msg),
  //     );
  //
  //     const req = httpTestingController.expectOne(`${receiptService.url}/${receiptService.receiptUrl}`);
  //     expect(req.request.method).toEqual('POST');
  //
  //     req.flush(msg, {status: 404, statusText: 'Not Found'});
  //   });
  // });
  //
  // describe('#read', () => {
  //   let expectedReceipt: any;
  //
  //   beforeEach(() => {
  //     const items = testList.map((t) => new Item({...t, people: testPeople}).toJson());
  //     expectedReceipt = new Receipt({...testReceipts[0], list: items, people: testPeople}).toJson();
  //   });
  //
  //   it('should return a receipt given its id', () => {
  //     receiptService.read(expectedReceipt.id).subscribe(
  //       (receipt: Receipt) => expect(receipt.toJson()).toEqual(expectedReceipt),
  //       fail,
  //     );
  //
  //     const req = httpTestingController.expectOne(`${receiptService.url}/${receiptService.receiptUrl}/` + expectedReceipt.id);
  //     expect(req.request.method).toEqual('GET');
  //
  //     req.flush(expectedReceipt);
  //   });
  //
  //   it('should return a empty receipt given an invalid id', () => {
  //     receiptService.read('wrongId').subscribe(
  //       (receipt) => {
  //         expect(receipt).toBeUndefined();
  //       },
  //       fail,
  //     );
  //
  //     const req = httpTestingController.expectOne(`${receiptService.url}/${receiptService.receiptUrl}/wrongId`);
  //     expect(req.request.method).toEqual('GET');
  //
  //     req.flush(null);
  //   });
  //
  //   it('should turn sever errors into empty receipt', () => {
  //     const msg = 'err msg';
  //     receiptService.read('id').subscribe(
  //       () => fail,
  //       (error) => expect(error.message).toContain(msg),
  //     );
  //
  //     const req = httpTestingController.expectOne(`${receiptService.url}/${receiptService.receiptUrl}/id`);
  //     expect(req.request.method).toEqual('GET');
  //
  //     req.flush('err msg', {status: 404, statusText: 'not found'});
  //   });
  // });
  //
  // describe('#save', () => {
  //   let expectedReceipt: any;
  //
  //   beforeEach(() => {
  //     const items = testList.map((t) => new Item({...t, people: testPeople}).toJson());
  //     expectedReceipt = new Receipt({...testReceipts[0], list: items, people: testPeople}).toJson();
  //   });
  //
  //   it('should return the updated receipt', () => {
  //     receiptService.save(new Receipt({list: []})).subscribe(
  //       (receipt: Receipt) => expect(receipt.toJson()).toEqual(expectedReceipt),
  //     );
  //
  //     const req = httpTestingController.expectOne(`${receiptService.url}/${receiptService.receiptUrl}/`);
  //     expect(req.request.method).toBe('PUT');
  //
  //     req.flush(expectedReceipt);
  //   });
  // });
});
