import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../../shared/modules/material.module';
import { ReceiptItemListComponent } from './receipt-item-list.component';

import { of } from 'rxjs';
import { Item, Person } from '../../shared/receipt.model';

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({
        id: 'c8e5e803-72eb-4b4c-aac1-4b1e1b5d5d9a',
        name: 'MEDICAL AIR',
        price: 12,
        image: 'http://dummyimage.com/174x230.jpg/cc0000/ffffff',
      }),
    };
  }
}

xdescribe('ReceiptDetailCardComponent', () => {
  let component: ReceiptItemListComponent;
  let fixture: ComponentFixture<ReceiptItemListComponent>;
  let receiptDe: DebugElement;
  let receiptEl: HTMLElement;
  let expectedItem: Item;
  let expectedPeople: Person[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptItemListComponent],
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        {provide: MatDialog, useClass: MatDialogMock},
        FormBuilder,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptItemListComponent);
    component = fixture.componentInstance;

    // find the item's DebugElement and HTMLElement
    receiptDe = fixture.debugElement.query(By.css('.card-title'));
    receiptEl = receiptDe.nativeElement;

    // mock the item supplied by the parent component
    expectedItem = {
      id: 'c8e5e803-72eb-4b4c-aac1-4b1e1b5d5d9a',
      name: 'MEDICAL AIR',
      price: 12,
      image: 'http://dummyimage.com/174x230.jpg/cc0000/ffffff',
    };
    expectedPeople = [{
      name: 'test',
      price: 0,
      isDriver: false,
      isPassenger: false,
      itemSelection: [false],
    }];

    // simulate the parent setting the input property with that item
    component.item = [expectedItem, 0];
    component.people = expectedPeople;

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should display the item name in title case', () => {
    const expectedName = expectedItem.name.toLowerCase();
    expect(receiptEl.textContent.toLowerCase()).toContain(expectedName);
  });

  it('should raise updated event when clicked', () => {
    let updatedItem: Item;
    component.updated.subscribe((item: Item) => {
      updatedItem = item;
    });
    const itemDe = fixture.debugElement.query(By.css('.edit'));

    itemDe.triggerEventHandler('click', null);
    itemDe.triggerEventHandler('click', null);
    expect(updatedItem).toEqual(expectedItem);
  });

  it('should raise deleted event when clicked', () => {
    let deletedItem: Item;
    component.deleted.subscribe((item: Item) => {
      deletedItem = item;
    });

    const itemDe = fixture.debugElement.query(By.css('.receiptDeleted'));

    itemDe.triggerEventHandler('click', null);
    expect(deletedItem).toEqual(expectedItem);
  });

  it('should raise toggled event when clicked', () => {
    let toggledRes: { person: Person, item: Item, index: number };
    component.toggled.subscribe((item) => {
      toggledRes = item;
    });

    const itemDe = fixture.debugElement.query(By.css('.toggle'));
    itemDe.triggerEventHandler('change', null);
    expect(toggledRes).toEqual({person: expectedPeople[0], item: expectedItem, index: 0});
  });

  it('should raise multiple toggled events when clicked selectAll', () => {
    let toggledRes: { person: Person, item: Item, index: number };
    component.toggled.subscribe((item) => {
      toggledRes = item;
    });
    console.log(component.people);
    const itemDe = fixture.debugElement.query(By.css('.toggleAll'));
    itemDe.triggerEventHandler('click', null);
    expect(toggledRes).toEqual({person: expectedPeople[0], item: expectedItem, index: 0});
  });

  it('should get width for bootstrap grid', () => {
    // tslint:disable-next-line:no-magic-numbers
    expect(component.width).toEqual(12);
  });

  it('should change isEdit to false when clicked', () => {
    fixture.detectChanges();
    const cancelDe: DebugElement = fixture.debugElement.query(By.css('.cancel'));
    cancelDe.triggerEventHandler('click', null);

    expect(component.isEdit).toBeFalsy();
  });
});
