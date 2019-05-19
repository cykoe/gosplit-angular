// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { SharedModule } from '../../../../shared/shared.module';
//
// import { Item } from '../../shared/item.model';
// import { ReceiptDetailCardComponent } from './receipt-detail-card.component';
//
// import { testLists, testPeople } from '../../shared/data';
//
// describe('ReceiptDetailCardComponent', () => {
//   let component: ReceiptDetailCardComponent;
//   let fixture: ComponentFixture<ReceiptDetailCardComponent>;
//   let item: Item;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         ReceiptDetailCardComponent,
//       ],
//       imports: [
//         SharedModule,
//       ],
//     }).compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ReceiptDetailCardComponent);
//     component = fixture.componentInstance;
//     item = new Item({...testLists[0], people: testPeople});
//     component.item = item;
//     fixture.detectChanges();
//   });
//
//   it('should set selection to true for all people and update the split', () => {
//     component.selectAll();
//     item.people.forEach((person) => {
//       expect(person.selection).toEqual(true);
//       expect(person.price).toEqual(item.price / item.people.length);
//     });
//   });
//
//   it('should set selection to false for all people and update the split', () => {
//     component.deselectAll();
//     item.people.forEach((person) => {
//       expect(person.selection).toEqual(false);
//       expect(person.price).toEqual(0);
//     });
//   });
//
//   it('should toggle selection of one person and update the split', () => {
//     const person = item.people[0];
//     const count = item.people.filter((p) => !!p.selection).length;
//     if (person.selection) {
//       expect(person.price).toEqual(item.price / count);
//       component.toggle();
//       expect<any>(person.selection).toEqual(false);
//       expect(person.price).toEqual(0);
//     } else {
//       expect(person.price).toEqual(0);
//       component.toggle();
//       expect(person.selection).toEqual(true);
//       expect(person.price).toEqual(item.price / (count + 1));
//     }
//   });
//
//   it('should update the item', () => {
//     component.form.controls['name'].setValue('newName');
//     component.form.controls['price'].setValue(1);
//     component.isEdit = true;
//     component.update();
//
//     expect(item.name).toEqual('newName');
//     expect(item.price).toEqual(1);
//     expect(component.isEdit).toEqual(false);
//   });
//
//   it('should raise the changed event', () => {
//     component.changed.subscribe(
//       (i) => expect(i).toBe(item),
//       fail,
//     );
//
//     component.change(item);
//   });
//
//   it('should raise the removed event', () => {
//     component.removed.subscribe(
//       (i) => expect(i).toBe(item),
//       fail,
//     );
//
//     component.remove(item);
//   });
//
// });
