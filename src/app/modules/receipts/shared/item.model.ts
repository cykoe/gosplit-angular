export class Item {
  id: string;
  name: string;
  price: number;
  image: string;
  barcode: string;
  people: string[];

  constructor(item: any = {}) {
    this.id = item._id || '';
    this.name = item.name || '';
    this.price = item.price || '';
    this.image = item.image || '';
    this.barcode = item.barcode || '';
    this.people = item.people || ['Charlie', 'Xinghan', 'Lawrence', 'Mohan', 'Haowei'];
  }
}
