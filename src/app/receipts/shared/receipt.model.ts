/**
 * Recei
 */
import { receipt } from '../../shared/data/receipt.seed';

class Receipt {
  id: string;
  subtotal: number;
  total: number;
  tax: number;
  date: string;
  store: string;
  userId: string;
  groupId: string;
  payer: string;
  list: Item[];
  people: Person[];

  /**
   *
   * @param receipt
   */
  constructor(receipt: any = {}) {
    this.id = receipt.id || '';
    this.subtotal = receipt.subtotal || 0;
    this.total = receipt.total || 0;
    this.tax = receipt.tax || 0;
    this.date = receipt.date || '';
    this.store = receipt.store || '';
    this.userId = receipt.userId || '';
    this.groupId = receipt.groupId || '';
    this.payer = receipt.payer || '';
    this.list = receipt.list || [];
    this.people = receipt.people || [];
  }

  isSubtotalRight() {
    const expectedSub = this.list.reduce((acc, cur) => acc + Number.parseFloat(`${cur.price}`), 0).toFixed(2);
    return (`${this.subtotal}` === `${expectedSub}`);
  }

  toUrlDate() {
    const date = new Date(this.date);
    const yy = date.getFullYear();
    // tslint:disable-next-line:no-magic-numbers
    const mm = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    // tslint:disable-next-line:no-magic-numbers
    const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${yy}/${mm}/${dd}`;
  }

  /**
   * push the new item to receipt's list, as well as create new
   * slots for each person's selection array
   * @param item
   */
  createItem(item: Item) {
    this.list.push(item);
    this.people.forEach((p) => p.itemSelection.push(false));
  }

  updateItemById(id: string, newItem: Item) {
    const item = this.list.find((i) => i.id === id);
    if (item) {
      item.price = newItem.price;
      item.image = newItem.image;
      item.name = newItem.name;
    }
  }

  deleteItemById(id: string) {
    this.list.splice(this.list.findIndex((i) => i.id === id), 1);
  }

  updateSplit(rewards: any = null) {
    if (this.list.length === 0) {
      this.people.forEach((person) => person.price === 0);
    } else {
      this.people.forEach((person) => {
        // person.price = this.list.map((item) => item.people.find((p) => p.name === person.name).price).reduce((acc, cur) => acc + cur);
      });
    }
    this.people.forEach((person) => person.price += this.tax / this.people.length);

    //  apply rewards
    if (rewards) {
      let punishmentCounter = 0;
      const punishmentTotal: number = this.people.reduce((acc, person) => {
        if (person.isPassenger) {
          if (rewards.passenger > person.price) {
            const price = person.price;
            person.price = 0;
            return acc + price;
          } else {
            person.price -= rewards.passenger;
            return acc + rewards.passenger;
          }
        } else if (person.isDriver) {
          if (rewards.driver > person.price) {
            const price = person.price;
            person.price = 0;
            return acc + price;
          } else {
            person.price -= rewards.driver;
            return acc + rewards.driver;
          }
        } else {
          punishmentCounter++;
          return acc;
        }
      }, 0);
      const punishmentEach = punishmentTotal / punishmentCounter;
      this.people.forEach((person) => {
        if (!person.isPassenger && !person.isDriver) {
          person.price += punishmentEach;
        }
      });
    }
  }

  toJson(): any {
    return {
      id: this.id,
      subtotal: this.subtotal,
      total: this.total,
      tax: this.tax,
      date: this.date,
      userId: this.userId,
      groupId: this.groupId,
      store: this.store,
      payer: this.payer,
      list: this.list,
      people: this.people,
    };
  }

  /**
   * Based on selected/deselected item of one person, change
   * the corresponding person's split based on the index number
   * of the item in the list array.
   * @param person - the one's price that will change
   * @param item - the selected/deselected item
   * @param index - item's index in the person's list array
   */
  toggleSelection(person: Person, item: Item, index: number) {
    // toggle the person's selection of the item
    person.itemSelection[index] = !person.itemSelection[index];

    // Everyone else's split will be reduced if the toggled selection
    // is true. It will be increased if the toggled selection is false
    if (person.itemSelection[index] === true) {
      const length = this.people.filter((p) => p.itemSelection[index]).length;
      const newItemSplit = item.price / length;
      if (length !== 1) {
        const oldItemSplit = item.price / (length - 1);
        // decrease everyone else's split
        this.people.forEach((p) => {
          if (p.name !== person.name) {
            if (p.price - (oldItemSplit - newItemSplit) >= 0) {
              p.price -= oldItemSplit - newItemSplit;
            }
          }
        });
      }
      // increase current person's split
      person.price += newItemSplit;
    } else {
      const length = this.people.filter((p) => p.itemSelection[index]).length + 1;
      const oldItemSplit = item.price / length;
      if (length !== 1) {
        const newItemSplit = item.price / (length - 1);
        // increase everyone else's split
        this.people.forEach((p) => {
          if (p.name !== person.name && p.itemSelection[index]) {
            p.price += newItemSplit - oldItemSplit;
          }
        });
      }
      // decrease current person's split
      person.price -= oldItemSplit;
    }
  }
}

export { Receipt };

export interface Person {
  name: string;
  price: number;
  isDriver: boolean;
  isPassenger: boolean;
  itemSelection: boolean[];
}

export interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
}
