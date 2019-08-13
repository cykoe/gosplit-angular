// import { Item, Person, Receipt } from './receipt.model';
//
// import { testReceipts } from './data';
//
// const getRand = (max) => {
//   return Math.floor(Math.random() * Math.floor(max));
// };
//
// const propNames = ['id', 'subtotal', 'total', 'tax', 'date', 'store', 'userId', 'groupId', 'payer', 'list', 'people'];
//
// describe('#ReceiptModel', () => {
//   let receipt: Receipt;
//
//   beforeEach(() => {
//     receipt = new Receipt(testReceipts[0]);
//     console.log(new Receipt(testReceipts[0]));
//   });
//
//   afterEach(() => {
//     receipt = undefined;
//   });
//
//   it('should construct a new Receipt', () => {
//     propNames.forEach((p) => {
//       expect(receipt[p]).toBeDefined();
//     });
//   });
//
//   it('should confirm subtotal matches total item price', () => {
//     const expectedSubtotal = receipt.list.reduce((acc, cur) => acc + cur.price, 0);
//     const realSubtotal = receipt.subtotal;
//     if (Number(expectedSubtotal) !== Number(realSubtotal)) {
//       expect(receipt.isSubtotalRight()).toBeFalsy();
//     } else {
//       expect(receipt.isSubtotalRight()).toBeTruthy();
//     }
//   });
//
//   it('should print out date yyyy/mm/dd format', () => {
//     const d = new Date(receipt.date);
//     let month = `${d.getMonth() + 1}`;
//     let day = `${d.getDate()}`;
//     const year = `${d.getFullYear()}`;
//
//     if (month.length < 2) {
//       month = `0${month}`;
//     }
//     if (day.length < 2) {
//       day = `0${day}`;
//     }
//
//     const expectedDate = [year, month, day].join('/');
//
//     expect(receipt.toUrlDate()).toEqual(expectedDate);
//   });
//
//   it('should create an item', () => {
//     const newItem = {id: 'id', name: 'name', price: 0, image: 'image'};
//     const expectedLength = receipt.list.length + 1;
//
//     receipt.createItem(newItem);
//
//     expect(receipt.list.length).toBeDefined(expectedLength);
//     expect(receipt.list.find((i) => i.id === newItem.id)).toBeDefined();
//   });
//
//   it('should updateItem an item', () => {
//     const oldItem = receipt.list[getRand(receipt.list.length)];
//     oldItem.price = 1;
//     const expectedLength = receipt.list.length;
//
//     receipt.updateItem();
//     const addedItem = receipt.list.find((l) => l.id === oldItem.id);
//
//     expect(receipt.list.length).toEqual(expectedLength);
//     expect(addedItem.id).toEqual(addedItem.id);
//     expect(addedItem.price).toEqual(1);
//   });
//
//   it('should receiptDeleted an item', () => {
//     const oldItem = receipt.list[getRand(receipt.list.length)];
//     const expectedLength = receipt.list.length - 1;
//
//     receipt.deleteItem(oldItem);
//     const addedItem = receipt.list.find((l) => l.id === oldItem.id);
//
//     expect(receipt.list.length).toEqual(expectedLength);
//     expect(addedItem).toBeUndefined();
//   });
//
//   describe('#Update Split', () => {
//
//     it('should toggle split from false => true', () => {
//       const person = receipt.people[0];
//       const item = receipt.list[0];
//       const index = 0;
//
//       receipt.toggleSelection(person, item, index);
//
//       expect(receipt.people[0].itemSelection[0]).toBeTruthy();
//       expect(receipt.people[0].price).toBe(item.price);
//     });
//
//     it('should toggle split from true => false', () => {
//       const person = receipt.people[0];
//       const item = receipt.list[0];
//       const index = 0;
//
//       receipt.toggleSelection(person, item, index);
//       receipt.toggleSelection(person, item, index);
//
//       expect(receipt.people[0].itemSelection[0]).toBeFalsy();
//       expect(receipt.people[0].price).toBe(0);
//     });
//
//   });
//
//   it('should get json format', () => {
//     console.log('final');
//     console.log(receipt);
//     expect(receipt.toJson()).toEqual(testReceipts[0]);
//   });
//
// });
