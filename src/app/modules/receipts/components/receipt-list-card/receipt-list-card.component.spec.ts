import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { asyncData } from '../../../../../testing';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { testReceipts } from '../../shared/data';
import { Receipt } from '../../shared/receipt.model';
import { ReceiptService } from '../../shared/receipt.service';
import { ReceiptListCardComponent } from './receipt-list-card.component';

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(new Receipt(testReceipts[0])),
    };
  }
}

describe('ReceiptListCardComponent', () => {
  let component: ReceiptListCardComponent;
  let fixture: ComponentFixture<ReceiptListCardComponent>;
  let receiptServiceSpy: jasmine.SpyObj<ReceiptService>;
  let expectedReceipt: Receipt;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const rsSpy = jasmine.createSpyObj('ReceiptService', ['delete']);
    TestBed.configureTestingModule({
      declarations: [ReceiptListCardComponent],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: MatDialog, useClass: MatDialogMock},
        {provide: ReceiptService, useValue: rsSpy},
      ],
      imports: [MaterialModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptListCardComponent);
    component = fixture.componentInstance;
    receiptServiceSpy = TestBed.get(ReceiptService);
    expectedReceipt = new Receipt(testReceipts[0]);
    component.receipt = expectedReceipt;
    fixture.detectChanges();
  });

  it('should navigate to receipt detail page after clicked', () => {
    const readDe: DebugElement = fixture.debugElement.query(By.css('.read'));
    readDe.triggerEventHandler('click', null);

    // args passed to router.navigate spy
    const router = fixture.debugElement.injector.get(Router);
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(navArgs[0]).toEqual(`receipts/groups/groupId/${expectedReceipt.toUrlDate()}/${expectedReceipt.store}/${expectedReceipt.id}`);
  });

  it('should raise deleted event after clicked delete', async(() => {
    receiptServiceSpy.delete.and.returnValue(asyncData(undefined));
    let deletedReceipt: Receipt;
    const deleteDe = fixture.debugElement.query(By.css('.delete'));
    deleteDe.triggerEventHandler('click', expectedReceipt);
    component.deleted.subscribe((r: Receipt) => {
      deletedReceipt = r;
    });

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(deletedReceipt).toEqual(expectedReceipt);
    });
  }));
});
