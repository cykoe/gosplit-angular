import { Receipt } from './receipt.model';

import { testLists, testPeople, testReceipts } from './data';
import { Item } from './item.model';

const getRand = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const propNames = ['id', 'subtotal', 'total', 'tax', 'date', 'store', 'userId', 'payer', 'list', 'people'];

describe('#ReceiptModel', () => {
  let receipt: Receipt;
  const r = testReceipts[getRand(testReceipts.length)];
  const people = testPeople[getRand(testPeople.length)];
  const list = testLists[getRand(testLists.length)];

  beforeEach(() => {
    receipt = new Receipt({...r, people, list});
  });

  it('should construct a new Receipt', () => {
    propNames.forEach((p) => {
      expect(receipt[p]).toBeDefined();
    });
  });

  it('should confirm subtotal matches total item price', () => {
    const expectedSubtotal = receipt.list.reduce((acc, cur) => acc + cur.price, 0);
    const realSubtotal = receipt.subtotal;
    if (Number(expectedSubtotal) !== Number(realSubtotal)) {
      expect(receipt.isSubtotalRight()).toBeFalsy();
    } else {
      expect(receipt.isSubtotalRight()).toBeTruthy();
    }
  });

  it('should print out date yyyy/mm/dd format', () => {
    const d = new Date(receipt.date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = `${d.getFullYear()}`;

    if (month.length < 2) { month = `0${month}`; }
    if (day.length < 2) { day = `0${day}`; }

    const expectedDate = [year, month, day].join('/');

    expect(receipt.toUrlDate()).toEqual(expectedDate);
  });

  it('should create an item', () => {
    const newItem = new Item(testLists[0][0]);
    const expectedLength = receipt.list.length + 1;

    receipt.createItem(newItem);
    const addedItem = receipt.list.find((l) => l.id === newItem.id);

    expect(receipt.list.length).toEqual(expectedLength);
    expect(addedItem).toBeDefined();
  });

  it('should update an item', () => {
    const oldItem = receipt.list[getRand(receipt.list.length)];
    oldItem.price = 1;
    const expectedLength = receipt.list.length;

    receipt.updateItem(oldItem);
    const addedItem = receipt.list.find((l) => l.id === oldItem.id);

    expect(receipt.list.length).toEqual(expectedLength);
    expect(addedItem.id).toEqual(addedItem.id);
    expect(addedItem.price).toEqual(1);
  });

  it('should delete an item', () => {
    const oldItem = receipt.list[getRand(receipt.list.length)];
    const expectedLength = receipt.list.length - 1;

    receipt.deleteItem(oldItem);
    const addedItem = receipt.list.find((l) => l.id === oldItem.id);

    expect(receipt.list.length).toEqual(expectedLength);
    expect(addedItem).toBeUndefined();
  });

  it('should update split (only one person chooses an single item', () => {
    const oldItem = receipt.list[getRand(receipt.list.length)];
    const expectedPeople = [...testPeople];
    const theChosen = expectedPeople[getRand(expectedPeople.length)];
    theChosen.price = oldItem.price;
    receipt.people.find((p) => p.name === theChosen.name).selection = true;

    receipt.updateSplit({});

    expect(receipt.people.map((p) => p.price)).toEqual(expectedPeople.map((p) => p.price));
  });

  it('should get json format', () => {
    expect(receipt.toJson()).toEqual({...r, people, list});
  });

});
