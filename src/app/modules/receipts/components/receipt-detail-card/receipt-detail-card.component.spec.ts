import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { testItems } from '../../shared/data/item.seed';
import { testPeople } from '../../shared/data/person.seed';
import { Item } from '../../shared/item.model';
import { ReceiptDetailCardComponent } from './receipt-detail-card.component';

describe('ReceiptDetailCardComponent', () => {
  let component: ReceiptDetailCardComponent;
  let fixture: ComponentFixture<ReceiptDetailCardComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('raises the changed event when clicked', () => {
    // TODO: form building element
    const comp = new ReceiptDetailCardComponent(FormBuilder);
    const item: Item = new Item({...testItems[0], people: testPeople});
    comp.item = item;

    comp.changed.subscribe((changedItem) => expect(changedItem).toBe(item));

    comp.selectAll();
  });
});
