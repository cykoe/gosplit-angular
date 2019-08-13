import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../../shared/modules/material.module';
import { ReceiptGroupNewCardComponent } from './receipt-group-new-card.component';

describe('ReceiptGroupNewCardComponent', () => {
  let component: ReceiptGroupNewCardComponent;
  let fixture: ComponentFixture<ReceiptGroupNewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ReceiptGroupNewCardComponent],
      providers: [FormBuilder],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptGroupNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a name when finish typing', () => {
    component.form.controls['person'].setValue('1');
    const addDe = fixture.debugElement.query(By.css('.add'));
    addDe.triggerEventHandler('matChipInputTokenEnd', {value: 'test'});

    expect(component.people.length).toEqual(1);
  });

  it('should remove a name when receiptDeleted them', () => {
    component.people = ['1'];
    fixture.detectChanges();
    const removeDe = fixture.debugElement.query(By.css('.remove'));
    removeDe.triggerEventHandler('removed', null);

    expect(component.people.length).toEqual(0);
  });

  it('should raise saved event when clicked', () => {
    component.form.controls['name'].setValue('name');
    component.form.controls['person'].setValue('1');
    component.people = ['1', '2'];
    let savedGroup: { name: string, people: string[] };

    component.saved.subscribe((group) => {
      savedGroup = group;
    });

    const saveDe: DebugElement = fixture.debugElement.query(By.css('.updateItem'));
    saveDe.triggerEventHandler('click', null);
    expect(savedGroup).toEqual({name: 'name', people: ['1', '2']});
  });
});
