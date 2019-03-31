import { AppConfig } from '../../../configs/app.config';
import { Person } from './person.model';

export class Item {

  constructor(item: any = {}) {
    this.id = item._id || '';
    this.name = item.name || '';
    this.price = item.price || '';
    this.image = item.image || '';
    this.people = (item.people || AppConfig.peopleList).map((person) => new Person(person));
  }
  id: string;
  name: string;
  price: number;
  image: string;
  people: Person[];

  static getPropertyNames() {
    return ['name', 'price', 'image'];
  }

  toJson() {
    return {
      _id: this.id,
      name: this.name,
      price: this.price,
      image: this.image,
      people: this.people.map((person) => person.toJson()),
    };
  }
}
