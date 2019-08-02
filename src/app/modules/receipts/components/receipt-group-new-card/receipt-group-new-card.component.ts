import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

function duplicateNameValidator(people: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const duplicate = control.value ? people.includes(control.value.trim()) : false;
    return duplicate ? {duplicateName: {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-receipt-group-new-card',
  templateUrl: './receipt-group-new-card.component.html',
  styleUrls: ['./receipt-group-new-card.component.scss'],
})
export class ReceiptGroupNewCardComponent implements OnInit {
  form: FormGroup;
  @Output() saved = new EventEmitter<any>();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  people: string[] = [];

  constructor(
    private fb: FormBuilder,
  ) {}

  get person() {
    return this.form.get('person');
  }

  get name() {
    return this.form.get('name');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      person: ['', [duplicateNameValidator(this.people), Validators.required]],
    });
  }

  /**
   * Add a new person name to people array
   * @param event
   */
  add(event: MatChipInputEvent): void {
    if (this.person.errors) {
      return;
    }
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.people.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove a person's name from people array
   * @param name name of the person
   */
  remove(name: string): void {
    const index = this.people.indexOf(name);

    if (index >= 0) {
      this.people.splice(index, 1);
    }
  }

  /**
   * Emit the group name and group members to parent component
   * then clear out current form values
   */
  saveGroup(): void {
    const name = this.form.get('name').value;
    const people = this.people;
    const group = {name, people};
    this.saved.emit(group);
    this.people = [];
    this.form.reset();
  }
}
