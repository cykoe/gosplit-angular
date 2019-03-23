import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Item } from '../../shared/item.model';
import { Person } from '../../shared/person.model';

@Component({
  selector: 'app-receipt-detail-card',
  templateUrl: './receipt-detail-card.component.html',
  styleUrls: ['./receipt-detail-card.component.scss'],
})
export class ReceiptDetailCardComponent implements OnInit {
  @Input() item: Item;
  @Output() readonly removed = new EventEmitter<Item>();
  @Output() readonly changed = new EventEmitter<Item>();
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.item.name],
      price: [this.item.price],
      image: [this.item.image],
    });
  }

  remove(item: Item) {
    this.removed.emit(item);
  }

  update() {
    if (this.isEdit) {
      this.item.name = this.form.get('name').value;
      this.item.price = this.form.get('price').value;
      this.item.image = this.form.get('image').value;
      this.updatePrice();
    }
    this.isEdit = !this.isEdit;
  }

  toggle(person: Person) {
    person.selection = !person.selection;
    this.updatePrice();
  }

  selectAll() {
    this.item.people.forEach((person) => person.selection = true);
    this.updatePrice();
  }

  removeAll() {
    this.item.people.forEach((person) => person.selection = false);
    this.updatePrice();
  }

  updatePrice() {
    const count = this.item.people.filter((p) => !!p.selection).length;
    const split = this.item.price / count;
    this.item.people.forEach((person) => person.price = person.selection ? split : 0);
    this.changed.emit(this.item);
  }
}
