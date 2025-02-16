// import { DebugElement } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
//
// import { RouterLinkDirectiveStub } from '../../../../testing';
// import { MaterialModule } from '../../../shared/modules/material.module';
// import { Group } from '../../../receipt/shared/group.model';
// import { GroupCardComponent } from './group-card.component';
//
// describe('ReceiptGroupCardComponent', () => {
//   let component: GroupCardComponent;
//   let fixture: ComponentFixture<GroupCardComponent>;
//   let groupDe: DebugElement;
//
//   let groupEl: HTMLElement;
//   let expectedGroup: Group;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [GroupCardComponent, RouterLinkDirectiveStub],
//       imports: [MaterialModule],
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(GroupCardComponent);
//     component = fixture.componentInstance;
//
//     // find the item's DebugElement and HTMLElement
//     groupDe = fixture.debugElement.query(By.css('.receiptDeleted'));
//     groupEl = fixture.nativeElement;
//
//     // mock the group supplied by the parent component
//     expectedGroup = new Group({id: 'id', name: 'name', people: ['1', '2']});
//
//     // simulate the parent setting the input property with that group
//     component.group = expectedGroup;
//
//     // trigger initial data binding
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should display group name', () => {
//     const expectedName = expectedGroup.name.toLowerCase();
//     expect(groupEl.textContent.toLowerCase()).toContain(expectedName);
//   });
//
//   it('should raise deleted event when clicked', () => {
//     let deletedGroup;
//     component.deleted.subscribe((group: Group) => {
//       deletedGroup = group;
//     });
//
//     const deleteDe = fixture.debugElement.query(By.css('.receiptDeleted'));
//     deleteDe.triggerEventHandler('click', null);
//     expect(deletedGroup).toEqual(expectedGroup);
//   });
// });
