import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';

import { ReceiptDetailCardComponent } from '../../components/receipt-detail-card/receipt-detail-card.component';
import { Item } from '../../shared/item.model';
import { Receipt } from '../../shared/receipt.model';
import { ReceiptService } from '../../shared/receipt.service';
import { ReceiptDetailPageComponent } from './receipt-detail-page.component';

import { asyncData } from '../../../../../testing';
import { ActivatedRoute, ActivatedRouteStub } from '../../../../../testing/activated-route-stub';
import { testItems, testPeople, testReceipts } from '../../shared/data';

describe('ReceiptDetailPageComponent', () => {
  let component: ReceiptDetailPageComponent;
  let fixture: ComponentFixture<ReceiptDetailPageComponent>;
  let receipt: Receipt;

  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const receiptServiceSpy = jasmine.createSpyObj('ReceiptService', ['read']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReceiptDetailPageComponent,
        ReceiptDetailCardComponent,
      ],
      imports: [
        SharedModule,
      ],
      providers: [
        {provide: ReceiptService, useValue: receiptServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRoute},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptDetailPageComponent);
    component = fixture.componentInstance;
    const items = testItems.map((t) => new Item({...t, people: testPeople}).toJson());
    receipt = new Receipt({...testReceipts[0], list: items, people: testPeople});
    activatedRoute.setParamMap({id: receipt.id});
    receiptServiceSpy.read.and.returnValue(asyncData(receipt));
    // fixture.detectChanges();
  });

  it('should NOT have receipts before ngOnInit ', () => {
    expect(component.receipt).toBeUndefined('should not have receipts before ngOnInit');
  });

  it('should NOT have receipts immediately after ngOnInit', () => {
    fixture.detectChanges();
    expect(component.receipt).toBeUndefined('should not have receipts until observable subscribed');
  });
  describe('after get receipts', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));

    it('should HAVE receipts', () => {
      expect(component.receipt).toBeDefined('should have receipts after observable subscribed');
    });
  });

});
