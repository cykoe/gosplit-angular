import { Person } from './person.model';

const defaultPeople = [{name: 'Charlie'}, {name: 'Xinghan'}, {name: 'Lawrence'}, {name: 'Mohan'}, {name: 'Haowei'}];

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
    this.people = (!item.people || !item.people.length)
      ? defaultPeople.map((person) => new Person(person))
      : item.people.map((person) => new Person(person));
  }

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
