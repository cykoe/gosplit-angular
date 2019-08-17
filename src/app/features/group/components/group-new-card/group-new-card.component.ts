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
import { v4 as uuid } from 'uuid';
import { IGroup } from '../../../../constants/models';

function duplicateNameValidator(people: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const duplicate = control.value ? people.includes(control.value.trim()) : false;
    return duplicate ? {duplicateName: {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-group-new-card',
  templateUrl: './group-new-card.component.html',
  styleUrls: ['./group-new-card.component.scss'],
})
export class GroupNewCardComponent implements OnInit {
  form: FormGroup;
  @Output() create = new EventEmitter<IGroup>();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  people: string[] = [];

  constructor(
    private fb: FormBuilder,
  ) {
  }

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

  saveGroup(): void {
    const name = this.form.get('name').value;
    const people = this.people;
    const group = {name, people, id: uuid()};
    this.create.emit(group);
    this.people = [];
    this.form.reset();
  }
}
