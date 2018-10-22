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
  driving?: [];
  image?: String;
}

class List {
  id: number;
  name: string;
  price: number;
}
