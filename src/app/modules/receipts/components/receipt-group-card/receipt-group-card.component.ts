import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Group } from '../../shared/group.model';

@Component({
  selector: 'app-receipt-group-card',
  templateUrl: './receipt-group-card.component.html',
  styleUrls: ['./receipt-group-card.component.scss'],
})
export class ReceiptGroupCardComponent implements OnInit {
  form: FormGroup;
  @Input() group: Group;
  @Output() saved = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
  ) { }

  get people() {
    return this.form.get('people') as FormArray;
  }

  get name() {
    return this.form.get('name');
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: this.group.name,
      people: this.fb.array(this.group.people),
    });
  }

  addName() {
    this.people.push(this.fb.control(''));
  }

  saveGroup() {
    this.group.name = this.form.get('name').value;
    this.group.people = this.form.get('people').value;
    this.saved.emit(this.group);
  }
}
