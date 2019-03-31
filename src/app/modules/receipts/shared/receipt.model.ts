import { AppConfig } from '../../../configs/app.config';
import { Item } from './item.model';
import { Person } from './person.model';

export class Receipt {
  id: string;
  subtotal: number;
  total: number;
  tax: number;
  date: string;
  store: string;
  userId: string;
  payer: string;
  list: Item[];
  people: Person[];

  constructor(receipt: any = {}) {
    this.id = receipt._id || '';
    this.subtotal = receipt.subtotal || 0;
    this.total = receipt.total || 0;
    this.tax = receipt.tax || 0;
    this.date = receipt.date || '';
    this.store = receipt.store || '';
    this.userId = receipt.userId || '';
    this.list = receipt.list.map((item) => new Item(item));
    this.payer = receipt.payer || '';
    if (!receipt.people.length) {
      this.people = AppConfig.peopleList.map((person) => new Person(person));
    } else {
      this.people = receipt.people.map((person) => new Person(person));
    }
  }

  isSubtotalRight() {
    const expectedSub = this.list.reduce((acc, cur) => acc + Number.parseFloat(`${cur.price}`), 0).toFixed(2);
    return (`${this.subtotal}` === `${expectedSub}`);
  }

  toUrlDate() {
    const date = new Date(this.date);
    return date.toLocaleDateString();
  }

  createItem(item: Item) {
    this.list.push(item);
  }

  updateItem(item: Item) {
    this.list[this.list.findIndex((i) => i.id === item.id)] = item;
    this.isSubtotalRight();
  }

  deleteItem(item: Item) {
    this.list.splice(this.list.findIndex((i) => i.name === item.name), 1);
  }

  updateSplit(rewards: any) {
    console.log(rewards);
    if (this.list.length === 0) {
      this.people.forEach((person) => person.price === 0);
    } else {
      this.people.forEach((person) => {
        person.price = this.list.map((item) => item.people.find((p) => p.name === person.name).price).reduce((acc, cur) => acc + cur);
      });
    }
    //  apply rewards
    if (rewards) {
      let counter = 0;
      const punishmentTotal: number = this.people.reduce((acc, person) => {
        if (person.isPassenger) {
          person.price -= rewards.passenger;
          return acc + rewards.passenger;
        } else if (person.isDriver) {
          person.price -= rewards.driver;
          return acc + rewards.driver;
        } else {
          counter++;
          return acc;
        }
      }, 0);
      const punishmentEach = punishmentTotal / counter;
      this.people.forEach((person) => {
        if (!person.isPassenger && !person.isDriver) {
          person.price += punishmentEach;
        }
      });
    }

    // apply taxes
    this.people.forEach((person) => person.price += this.tax / this.people.length);
  }

  toJson(): any {
    return {
      _id: this.id,
      subtotal: this.subtotal,
      total: this.total,
      tax: this.tax,
      date: this.date,
      userId: this.userId,
      store: this.store,
      payer: this.payer,
      list: this.list.map((list) => list.toJson()),
      people: this.people.map((person) => person.toJson()),
    };
  }
}
