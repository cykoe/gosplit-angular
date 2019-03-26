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
    if (!receipt.people.length) {
      this.people = AppConfig.peopleList.map((person) => new Person(person));
    } else {
      this.people = receipt.people.map((person) => new Person(person));
    }
  }

  toUrlDate() {
    const date = new Date(this.date);
    return date.toLocaleDateString();
  }

  createItem(item: Item) {
    this.list.push(item);
    this.people.forEach((p, i) => p.price += this.split[i]);
  }

  updateItem(item: Item) {
    const index = this.list.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.list[index] = item;
    }
    this.people.forEach((p, i) => p.price += this.split[i]);
  }

  deleteItem(item: Item) {
    const index = this.list.findIndex((i) => i.name === item.name);
    this.list.splice(index, 1);
    this.people.forEach((p, i) => p.price += this.split[i]);
  }

  get split() {
    const split = this.list.reduce((acc, item) => {
      return acc.map((p, i) => {
        return p + item.people[i].price;
      });
    }, new Array(this.people.length).fill(0));
    return split;
    // TODO: fix driver fees
    // let counter = 0;
    // const reward = this.people.reduce((acc, cur) => {
    //   if (cur.isDriver || cur.isPassenger) {
    //     counter++;
    //     return acc + cur.price;
    //   } else {
    //     return acc;
    //   }
    // }, 0);
    // const punishment = reward / counter;
    // return this.people.forEach((p) => {
    //   if (p.isDriver) {
    //     p.price -= AppConfig.rewards.driver;
    //   } else if (p.isPassenger) {
    //     p.price -= AppConfig.rewards.passenger;
    //   }
    // });
  }

  toJson() {
    return {
      _id: this.id,
      subtotal: this.subtotal,
      total: this.total,
      tax: this.tax,
      date: this.date,
      userId: this.userId,
      store: this.store,
      list: this.list.map((list) => list.toJson()),
      people: this.people.map((person) => person.toJson()),
    };
  }
}
