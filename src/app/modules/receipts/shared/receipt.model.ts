import { Item } from './item.model';

export class Receipt {
  id: string;
  subtotal: number;
  total: number;
  tax: number;
  date: string;
  list: Item[];
  store: string;
  length: number;
  split: number[];
  selectAllPrice: boolean[];
  driverList: number[];
  numberChart: number[][];
  booleanChart: boolean[][];
  payer: string;
  people: string[];
  userId: string;

  constructor(receipt: any = {}) {
    this.id = receipt._id || '';
    this.subtotal = receipt.subtotal || '';
    this.total = receipt.total || '';
    this.tax = receipt.tax || '';
    this.date = receipt.date || '';
    this.list = receipt.list.map((list) => new Item(list));
    this.store = receipt.store || '';
    this.length = receipt.length || '';
    this.split = receipt.split || '';
    this.selectAllPrice = receipt.selectAllPrice || '';
    this.driverList = receipt.driverList || '';
    this.numberChart = receipt.numberChart || '';
    this.booleanChart = receipt.booleanChart || '';
    this.payer = receipt.payer || '';
    this.people = receipt.people || '';
    this.userId = receipt.userId || '';
  }

  toUrlDate() {
    const date = new Date(this.date);
    return date.toLocaleDateString();
  }

  removeItem(item: Item) {
    const index = this.list.findIndex((i) => i.name === item.name);
    this.list.splice(index, 1);
  }

  addItem(item: Item) {
    this.list.push(item);
  }

  toJson() {
    return {
      id: this.id,
      subtotal: this.subtotal,
      total: this.total,
      tax: this.tax,
      date: this.date,
      list: this.list,
      store: this.store,
      length: this.length,
      split: this.split,
      selectAllPrice: this.selectAllPrice,
      driverList: this.driverList,
      numberChart: this.numberChart,
      booleanChart: this.booleanChart,
      payer: this.payer,
      people: this.people,
      userId: this.userId,
    };
  }
}
