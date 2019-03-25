import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';

import { ReceiptDetailCardComponent } from '../../components/receipt-detail-card/receipt-detail-card.component';
import { ReceiptDetailPageComponent } from './receipt-detail-page.component';

import { ActivatedRoute, ActivatedRouteStub, asyncData } from '../../../../../testing';
import { testItems, testPeople, testReceipts } from '../../shared/data';
import { Item } from '../../shared/item.model';
import { Receipt } from '../../shared/receipt.model';
import { ReceiptService } from '../../shared/receipt.service';

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
  });

  const click = () => {
    const receiptDe: DebugElement = fixture.debugElement;
    receiptDe.triggerEventHandler('changed', receipt.list[0]);
  };

  describe('before get receipts', () => {
    it('should NOT have receipt before ngOnInit ', () => {
      expect(component.receipt).toBeUndefined('should not have receipts before ngOnInit');
    });

    it('should NOT have receipt immediately after ngOnInit', () => {
      fixture.detectChanges();
      expect(component.receipt).toBeUndefined('should not have receipts until observable subscribed');
    });
  });

  describe('after get receipts', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));

    it('should HAVE receipts', () => {
      expect(component.receipt).toEqual(receipt);
    });

    it('should DISPLAY receipts', () => {
      const items = fixture.debugElement.nativeElement.querySelectorAll('app-receipt-detail-card');
      expect(items.length).toBe(receipt.list.length, `should display ${receipt.list.length} items`);
    });

    it('should CREATE an item within the receipt', () => {
      const newItem = new Item({...testItems[0], people: testPeople, _id: 'tempId'});
      newItem.people.forEach((person) => person.selection = true);
      newItem.people.forEach((person) => person.price = newItem.price / newItem.people.length);
      const expectedSplit = receipt.split.map((o, i) => o + newItem.people[i].price);
      const expectedLength = receipt.list.length + 1;

      component.createItem(newItem.toJson());

      expect(receipt.split).toEqual(expectedSplit);
      expect(receipt.list.length).toEqual(expectedLength);
    });

    it('should UPDATE an item within the receipt', () => {
      const price = receipt.list[0].price / receipt.people.length;
      const expectedSplit = new Array(receipt.people.length).fill(price);

      const item = receipt.list[0];
      item.people.forEach((person) => person.selection = true);
      item.people.forEach((person) => person.price = item.price / item.people.length);
      component.updateItem(item);

      expect(receipt.split).toEqual(expectedSplit);
    });

    it('should REMOVE an item within the receipt', () => {
      receipt.list[0].people.forEach((person) => person.selection = true);
      receipt.list[0].people.forEach((person) => person.price = receipt.list[0].price / receipt.list[0].people.length);
      const expectedSplit = receipt.split;
      const expectedLength = receipt.list.length - 1;

      const item = receipt.list[1];
      component.deleteItem(item);

      expect(receipt.split).toEqual(expectedSplit);
      expect(receipt.list.length).toEqual(expectedLength);
    });
  });

});
