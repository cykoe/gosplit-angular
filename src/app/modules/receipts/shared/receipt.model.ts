export class Receipt {
  id: string;
  subtotal: number;
  total: number;
  tax: number;
  date: string;
  list: IList[];
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
    this.id = receipt.id || '';
    this.subtotal = receipt.subtotal || '';
    this.total = receipt.total || '';
    this.tax = receipt.tax || '';
    this.date = receipt.date || '';
    this.list = receipt.list || '';
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

interface IList {
  id: number;
  name: string;
  price: number;
  image: string;
}
