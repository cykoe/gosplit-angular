import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MaterialModule } from '../../../../shared/modules/material.module';
import { Group } from '../../shared/group.model';
import { ReceiptGroupCardComponent } from './receipt-group-card.component';
import { RouterLinkDirectiveStub } from "../../../../../testing";

describe('ReceiptGroupCardComponent', () => {
  let component: ReceiptGroupCardComponent;
  let fixture: ComponentFixture<ReceiptGroupCardComponent>;
  let groupDe: DebugElement;

  let groupEl: HTMLElement;
  let expectedGroup: Group;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptGroupCardComponent, RouterLinkDirectiveStub],
      imports: [MaterialModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptGroupCardComponent);
    component = fixture.componentInstance;

    // find the item's DebugElement and HTMLElement
    groupDe = fixture.debugElement.query(By.css('.delete'));
    groupEl = fixture.nativeElement;

    // mock the group supplied by the parent component
    expectedGroup = new Group({id: 'id', name: 'name', people: ['1', '2']});

    // simulate the parent setting the input property with that group
    component.group = expectedGroup;

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display group name', () => {
    const expectedName = expectedGroup.name.toLowerCase();
    expect(groupEl.textContent.toLowerCase()).toContain(expectedName);
  });

  it('should raise deleted event when clicked', () => {
    let deletedGroup;
    component.deleted.subscribe((group: Group) => {
      deletedGroup = group;
    });

    const deleteDe = fixture.debugElement.query(By.css('.delete'));
    deleteDe.triggerEventHandler('click', null);
    expect(deletedGroup).toEqual(expectedGroup);
  });
});
