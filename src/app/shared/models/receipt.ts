export class Receipt {
  id?: string;
  subtotal?: number;
  total?: number;
  tax?: number;
  date?: Date;
  list?: List[];
  store?: string;
  length?: number;
  split?: number[];
  driverList?: number[];
  selectAllPrice?: boolean[];
  numberChart?: number[][];
  booleanChart?: boolean[][];
  payer: string;
}

class List {
  id: number;
  name: string;
  price: number;
  image: string;
}
