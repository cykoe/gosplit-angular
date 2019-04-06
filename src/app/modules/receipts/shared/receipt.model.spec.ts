import { Receipt } from './receipt.model';

import { AppConfig } from '../../../configs/app.config';
import { testLists, testPeople, testReceipts } from './data';
import { Item } from './item.model';
import { Person } from './person.model';

const getRand = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const propNames = ['id', 'subtotal', 'total', 'tax', 'date', 'store', 'userId', 'payer', 'list', 'people'];

describe('#ReceiptModel', () => {
  let receipt: Receipt;
  const r = testReceipts[getRand(testReceipts.length)];
  const people = testPeople;
  const list: any[] = testLists[getRand(testLists.length)];

  beforeEach(() => {
    list.forEach((item) => item.people = people);
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

    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }

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

    receipt.updateItem();
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

  describe('#Update Split', () => {
    let item: Item;
    let person1: Person;
    let person2: Person;
    let expectedPeople: any[];

    beforeEach(() => {
      item = receipt.list[getRand(receipt.list.length)];
      expectedPeople = [...testPeople];
      person1 = expectedPeople[0];
      person1.price = item.price / 2;
      item.people.find((person) => person.name === person1.name).selection = true;
      item.people.find((person) => person.name === person1.name).price = item.price / 2;
      person2 = expectedPeople[1];
      person2.price = item.price / 2;
      item.people.find((person) => person.name === person2.name).selection = true;
      item.people.find((person) => person.name === person2.name).price = item.price / 2;
      expectedPeople.forEach((person) => person.price += receipt.tax / expectedPeople.length);
    });

    afterEach(() => {
      expectedPeople.forEach((person) => person.price = 0);
      item.people.find((person) => person.name === person1.name).selection = false;
      item.people.find((person) => person.name === person1.name).price = 0;
      item.people.find((person) => person.name === person2.name).selection = false;
      item.people.find((person) => person.name === person2.name).price = 0;
    });

    it('should update split (without rewards)', () => {
      receipt.updateSplit();
      expect(receipt.people.map((p) => p.price)).toEqual(expectedPeople.map((p) => p.price));
    });

    it('should update split (with rewards)', () => {
      receipt.people.find((person) => person.name === person1.name).isDriver = true;
      receipt.people.find((person) => person.name === person2.name).isPassenger = true;
      const p1 = (person1.price > AppConfig.rewards.driver) ? AppConfig.rewards.driver : person1.price;
      const p2 = (person2.price > AppConfig.rewards.passenger) ? AppConfig.rewards.passenger : person2.price;
      person1.price -= p1;
      person2.price -= p2;
      const punishmentTotal = p1 + p2;
      expectedPeople.forEach((person) => {
        if (person.name !== person1.name && person.name !== person2.name) {
          person.price += punishmentTotal / (expectedPeople.length - 2);
        }
      });
      receipt.updateSplit(AppConfig.rewards);

      expect(receipt.people.map((p) => p.price.toFixed(2))).toEqual(expectedPeople.map((p) => p.price.toFixed(2)));
      receipt.people.forEach((p) => {
        expect(p.price).toBeGreaterThanOrEqual(0);
      });
      receipt.people.find((person) => person.name === person1.name).isDriver = false;
      receipt.people.find((person) => person.name === person2.name).isPassenger = false;
    });
  });

  it('should get json format', () => {
    expect(receipt.toJson()).toEqual({...r, people, list});
  });

});
