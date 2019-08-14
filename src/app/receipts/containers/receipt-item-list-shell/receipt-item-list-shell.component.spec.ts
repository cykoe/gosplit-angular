// import { DebugElement } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Router } from '@angular/router';
// import { SharedModule } from '../../../../shared/shared.module';
//
// import { ReceiptDetailCardComponent } from '../../components/receipt-detail-card/receipt-detail-card.component';
// import { ReceiptDetailPageComponent } from './receipt-detail-page.component';
//
// import { ActivatedRoute, ActivatedRouteStub, asyncData } from '../../../../../testing';
// import { testLists, testPeople, testReceipts } from '../../shared/data';
// import { Item } from '../../shared/item.model';
// import { Receipt } from '../../shared/receipt.model';
// import { ReceiptService } from '../../shared/receipt.service';
//
// describe('DemoDetailComponent', () => {
//   let component: ReceiptDetailPageComponent;
//   let fixture: ComponentFixture<ReceiptDetailPageComponent>;
//   let receipt: Receipt;
//
//   const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();
//   const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
//   const receiptServiceSpy = jasmine.createSpyObj('ReceiptService', ['receiptSelected']);
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         ReceiptDetailPageComponent,
//         ReceiptDetailCardComponent,
//       ],
//       imports: [
//         SharedModule,
//         BrowserAnimationsModule,
//       ],
//       providers: [
//         {provide: ReceiptService, useValue: receiptServiceSpy},
//         {provide: Router, useValue: routerSpy},
//         {provide: ActivatedRoute, useValue: activatedRoute},
//       ],
//     }).compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ReceiptDetailPageComponent);
//     component = fixture.componentInstance;
//     const items = testLists.map((t) => new Item({...t, people: testPeople}).toJson());
//     receipt = new Receipt({...testReceipts[0], list: items, people: testPeople});
//     activatedRoute.setParamMap({id: receipt.id});
//     receiptServiceSpy.receiptSelected.and.returnValue(asyncData(receipt));
//   });
//
//   const click = (eventName: string) => {
//     const receiptDe: DebugElement = fixture.debugElement.query(By.css('app-receipt-detail-card'));
//     const changedPeople = receipt.list[0].people.map((person) => {
//       const newPerson = {...person};
//       newPerson.selection = true;
//       newPerson.price = receipt.list[0].price / receipt.list[0].people.length;
//       return newPerson;
//     });
//     const changedItem = {...receipt.list[0], people: changedPeople};
//     receiptDe.triggerEventHandler(eventName, changedItem);
//   };
//
//   describe('before get receipts', () => {
//     it('should NOT have receipt before ngOnInit ', () => {
//       expect(component.receipt).toBeUndefined('should not have receipts before ngOnInit');
//     });
//
//     it('should NOT have receipt immediately after ngOnInit', () => {
//       fixture.detectChanges();
//       expect(component.receipt).toBeUndefined('should not have receipts until observable subscribed');
//     });
//   });
//
//   describe('after get receipts', () => {
//     beforeEach(async(() => {
//       fixture.detectChanges();
//       fixture.whenStable()
//         .then(() => fixture.detectChanges());
//     }));
//
//     it('should HAVE receipts', () => {
//       expect(component.receipt).toEqual(receipt);
//     });
//
//     it('should DISPLAY receipts', () => {
//       const items = fixture.debugElement.nativeElement.querySelectorAll('app-receipt-detail-card');
//       expect(items.length).toBe(receipt.list.length, `should display ${receipt.list.length} items`);
//     });
//
//     it('should UPDATE an item within the receipt', () => {
//       const price = receipt.list[0].price / receipt.people.length;
//       const expectedSplit = new Array(receipt.people.length).fill(price);
//
//       const item = receipt.list[0];
//       item.people.forEach((person) => person.selection = true);
//       item.people.forEach((person) => person.price = item.price / item.people.length);
//       component.updateItem(item);
//
//       expect(receipt.people.map((p) => p.price)).toEqual(expectedSplit);
//     });
//
//     it('should REMOVE an item within the receipt', () => {
//       const expectedLength = receipt.list.length - 1;
//
//       const item = receipt.list[1];
//       component.deleteItem(item);
//
//       expect(receipt.list.length).toEqual(expectedLength);
//     });
//
//     it('should raise the CHANGED event when clicked', () => {
//       // original split
//       const expectedSplit = receipt.people.map(() => {
//         return receipt.list[0].price / receipt.list[0].people.length;
//       });
//
//       click('changed');
//
//       // after split
//       const newSplit = receipt.people.map((person) => person.price);
//       expect(newSplit).toEqual(expectedSplit);
//     });
//
//     it('should raise the REMOVED event when clicked', () => {
//       // original split
//       const expectedSplit = receipt.people.map((person) => person.price += receipt.list[0].price / receipt.list[0].people.length);
//
//       click('removed');
//
//       // after split
//       const newSplit = receipt.people.map((person) => person.price);
//       expect(newSplit).toEqual(expectedSplit);
//     });
//   });
//
// });
