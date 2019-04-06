import { Item } from './item.model';
import { Person } from './person.model';

const defaultPeople = [{name: 'Charlie'}, {name: 'Xinghan'}, {name: 'Lawrence'}, {name: 'Mohan'}, {name: 'Haowei'}];

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
    this.people = (!receipt.people || !receipt.people.length)
      ? defaultPeople.map((person) => new Person(person))
      : receipt.people.map((person) => new Person(person));
  }

  isSubtotalRight() {
    const expectedSub = this.list.reduce((acc, cur) => acc + Number.parseFloat(`${cur.price}`), 0).toFixed(2);
    return (`${this.subtotal}` === `${expectedSub}`);
  }

  toUrlDate() {
    const date = new Date(this.date);
    const yy = date.getFullYear();
    // tslint:disable-next-line:no-magic-numbers
    const mm = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    // tslint:disable-next-line:no-magic-numbers
    const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${yy}/${mm}/${dd}`;
  }

  createItem(item: Item) {
    this.list.push(item);
  }

  updateItem() {
    this.isSubtotalRight();
  }

  deleteItem(item: Item) {
    this.list.splice(this.list.findIndex((i) => i.name === item.name), 1);
  }

  updateSplit(rewards: any = null) {
    if (this.list.length === 0) {
      this.people.forEach((person) => person.price === 0);
    } else {
      this.people.forEach((person) => {
        person.price = this.list.map((item) => item.people.find((p) => p.name === person.name).price).reduce((acc, cur) => acc + cur);
      });
    }
    this.people.forEach((person) => person.price += this.tax / this.people.length);

    //  apply rewards
    if (rewards) {
      let punishmentCounter = 0;
      const punishmentTotal: number = this.people.reduce((acc, person) => {
        if (person.isPassenger) {
          if (rewards.passenger > person.price) {
            const price = person.price;
            person.price = 0;
            return acc + price;
          } else {
            person.price -= rewards.passenger;
            return acc + rewards.passenger;
          }
        } else if (person.isDriver) {
          if (rewards.driver > person.price) {
            const price = person.price;
            person.price = 0;
            return acc + price;
          } else {
            person.price -= rewards.driver;
            return acc + rewards.driver;
          }
        } else {
          punishmentCounter++;
          return acc;
        }
      }, 0);
      const punishmentEach = punishmentTotal / punishmentCounter;
      this.people.forEach((person) => {
        if (!person.isPassenger && !person.isDriver) {
          person.price += punishmentEach;
        }
      });
    }
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
      list: this.list.map((item) => item.toJson()),
      people: this.people.map((person) => person.toJson()),
    };
  }
}
