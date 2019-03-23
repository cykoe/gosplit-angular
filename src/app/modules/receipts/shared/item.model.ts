export class Item {
  id: string;
  name: string;
  price: number;
  image: string;
  barcode: string;
  people: IPerson[];

  constructor(item: any = {}) {
    this.id = item._id || '';
    this.name = item.name || '';
    this.price = item.price || '';
    this.image = item.image || '';
    this.barcode = item.barcode || '';
    this.people = item.people || [
      {
        name: 'Charlie',
        selection: false,
        price: 0,
      },
      {
        name: 'Xinghan',
        selection: false,
        price: 0,
      },
      {
        name: 'Lawrence',
        selection: false,
        price: 0,
      },
      {
        name: 'Mohan',
        selection: false,
        price: 0,
      },
      {
        name: 'Haowei',
        selection: false,
        price: 0,
      },
    ];
  }
}

export interface IPerson {
  name: string;
  selection: boolean;
  price: number;
}
