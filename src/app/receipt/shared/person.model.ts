import { Config } from '../../constants/config';

export class Person {
  name: string;
  selection: boolean;
  price: number;
  isDriver: boolean;
  isPassenger: boolean;

  constructor(person: any) {
    this.name = person.name || '';
    this.selection = person.selection || false;
    this.price = Number.parseFloat(person.price) || 0;
    this.isDriver = person.isDriver || false;
    this.isPassenger = person.isPassenger || false;
  }

  toJson() {
    return {
      name: this.name,
      selection: this.selection,
      price: this.price,
      isDriver: this.isDriver,
      isPassenger: this.isPassenger,
    };
  }

  get status() {
    if (this.isDriver) {
      return {name: 'Driver', reward: `-${Config.rewards.driver}`};
    } else if (this.isPassenger) {
      return {name: 'Passenger', reward: `-${Config.rewards.passenger}`};
    } else {
      return {name: 'Salty Fish', reward: ''};
    }
  }
}
