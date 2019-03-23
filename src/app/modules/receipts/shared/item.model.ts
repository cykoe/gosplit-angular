import { AppConfig } from '../../../configs/app.config';
import { Person } from './person.model';

export class Item {
  id: string;
  name: string;
  price: number;
  image: string;
  people: Person[];

  constructor(item: any = {}) {
    this.id = item._id || '';
    this.name = item.name || '';
    this.price = item.price || '';
    this.image = item.image || '';
    this.people = (item.people || AppConfig.peopleList).map((person) => new Person(person));
  }

  toJson() {
    return {
      id: this.id,
      name: this.image,
      price: this.price,
      image: this.image,
      people: this.people.map((person) => person.toJson()),
    };
  }
}
